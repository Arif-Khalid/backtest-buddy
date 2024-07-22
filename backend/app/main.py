from fastapi import Depends, FastAPI, HTTPException, Response
from functools import lru_cache
from typing import Optional
import datetime
from app.utils.trading_client import TradingClient
from app.models.trading_models import StrategyEnum, TimeFrameEnum
from app.core.config import Settings

app = FastAPI()


@lru_cache
def get_settings() -> Settings:
    return Settings()


@app.get("/returns/{symbol}/{strategy}")
def get_returns(
    symbol: str,
    strategy: StrategyEnum,
    period: TimeFrameEnum,
    start: str,
    end: Optional[str] = None,
    settings: Settings = Depends(get_settings),
):
    """Retrieve strategy returns for a given symbol, strategy and period

    Args:
        symbol (str): The stock symbol
        strategy (StrategyEnum): The strategy to use
        period (TimeFrameEnum): The period of each candle
        start (str): The start date of the data
        end (str, optional): The end date of the data. Defaults to the dat before the current day.

    Raises:
        HTTPException: 400: If the date format is invalid
        HTTPException: 400: If the period is invalid
        HTTPException: 500: If unable to establish connection to Alpaca
        HTTPException: 500: If unable to retrieve data

    Returns:
        dict: The strategy returns with the keys as the date and the values as the strategy direction
    """
    try:
        start = datetime.datetime.strptime(start, "%Y-%m-%d")
        if end:
            end = datetime.datetime.strptime(end, "%Y-%m-%d")
        else:
            # Cannot use datetime.now() directly because Alpaca prevents reading today's data
            end = datetime.datetime.now() - datetime.timedelta(days=1)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    try:
        trading_client = TradingClient(
            settings.ALPACA_KEY,
            settings.ALPACA_SECRET,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to establish connection to Alpaca: {e}"
        ) from e
    try:
        symbol = symbol.upper()
        return trading_client.get_strategy_returns(symbol, strategy, period, start, end)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to retrieve data: {e}"
        ) from e


@app.get(
    "/data/{symbol}",
    status_code=200,
)
def get_data(
    symbol: str,
    period: TimeFrameEnum,
    start: str,
    end: Optional[str] = None,
    settings: Settings = Depends(get_settings),
):
    """Retrieve historical data for a given symbol and period

    Args:
        symbol (str): The stock symbol
        period (TimeFrameEnum): The period of each candle
        start (str): The start date of the data
        end (str, optional): The end date of the data. Defaults to the dat before the current day.

    Raises:
        HTTPException: 400: If the date format is invalid
        HTTPException: 400: If the period is invalid
        HTTPException: 500: If unable to establish connection to Alpaca
        HTTPException: 500: If unable to retrieve data

    Returns:
        dict: The historical data with the keys open, high, low, close, volume.
        Values are dictionaries with the date as the key and the respective ohlcv value as the value.
    """
    try:
        start = datetime.datetime.strptime(start, "%Y-%m-%d")
        if end:
            end = datetime.datetime.strptime(end, "%Y-%m-%d")
        else:
            # Cannot use datetime.now() directly because Alpaca prevents reading today's data
            end = datetime.datetime.now() - datetime.timedelta(days=1)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    try:
        trading_client = TradingClient(
            settings.ALPACA_KEY,
            settings.ALPACA_SECRET,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to establish connection to Alpaca: {e}"
        ) from e

    try:
        symbol = symbol.upper()
        df = trading_client.get_candles(symbol, period, start, end)
        return {"data": df.to_dict()}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to retrieve data: {e}"
        ) from e
