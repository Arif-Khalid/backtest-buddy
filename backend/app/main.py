from fastapi import Depends, FastAPI, HTTPException, Response
from functools import lru_cache
import uvicorn
from typing import Optional
import datetime
from app.utils.trading import TradingClient
from app.models.trading_models import TimeFrameEnum
from dotenv import load_dotenv
from app.core.config import Settings

app = FastAPI()


@lru_cache
def get_settings() -> Settings:
    return Settings()


@app.get(
    "/data/{symbol}/{period}/{start}/{end}",
    status_code=200,
)

def get_data(
    symbol: str,
    period: TimeFrameEnum,
    start: str,
    end: Optional[str],
    response: Response,
    settings: Settings = Depends(get_settings),
):
    try:
        start = datetime.datetime.strptime(start, "%Y-%m-%d")
        if end:
            end = datetime.datetime.strptime(end, "%Y-%m-%d")
        else:
            end = datetime.datetime.now()
    except ValueError:
        response.status_code = 400
        return {"error": "Invalid date format"}

    try:
        timeframe = period.to_timeframe()
    except ValueError:
        response.status_code = 400
        return {"error": "Invalid period"}

    try:
        trading_client = TradingClient(
            settings.alpaca_key,
            settings.alpaca_secret,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to establish connection to Alpaca: {e}"
        ) from e

    try:
        symbol = symbol.upper()
        df = trading_client.get_candles(symbol, timeframe, start, end)
        return {"data": df.to_dict()}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Unable to retrieve data: {e}"
        ) from e
