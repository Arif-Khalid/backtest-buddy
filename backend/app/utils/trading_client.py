import os
from dotenv import load_dotenv
from alpaca.data.historical.stock import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from alpaca.data.models.bars import BarSet
import pandas as pd
import numpy as np
import datetime

from app.models.trading_models import DirectionEnum, StrategyEnum, TimeFrameEnum
from app.utils.trading_strategies import get_strategy_directions
from app.utils.trading_strategies import get_bot_results


RELEVANT_KEYS = ["open", "high", "low", "close", "volume", "timestamp"]


class TradingClient:
    def __init__(self, key: str, secret: str):
        self.stock_historical_data_client = StockHistoricalDataClient(key, secret)

    # Converts retrieved stock bars to a pandas dataframe
    def stock_bars_to_DF(self, stockBars: BarSet, symbol: str) -> pd.DataFrame:
        if len(stockBars.data[symbol]) == 0 or symbol is None:
            raise ValueError(f"No data for symbol: {symbol}")
        data = stockBars.data[symbol]
        dfInputs = {key: [] for key in RELEVANT_KEYS}
        for bar in data:
            barDict = bar.model_dump()
            for key in RELEVANT_KEYS:
                dfInputs[key].append(barDict[key])

        df = pd.DataFrame(dfInputs)
        df.set_index("timestamp", inplace=True)
        return df

    def get_candles(
        self,
        symbol: str,
        timeframe: TimeFrameEnum,
        start: datetime.datetime,
        end: datetime.datetime = None,
    ) -> pd.DataFrame:

        stockBarsRequest = StockBarsRequest(
            symbol_or_symbols=symbol,
            timeframe=timeframe.to_timeframe(),
            start=start,
            end=end,
        )
        stockBars = self.stock_historical_data_client.get_stock_bars(stockBarsRequest)
        return self.stock_bars_to_DF(stockBars, symbol)

    def get_strategy_returns(
        self,
        symbol: str,
        strategy: StrategyEnum,
        timeframe: TimeFrameEnum,
        amount: float,
        start: datetime.datetime,
        end: datetime.datetime = None,
    ) -> pd.DataFrame:
        candles = self.get_candles(symbol, timeframe, start, end)
        directions = get_strategy_directions(candles, strategy)
        candles["direction"] = directions
        # Shift the directions by one to avoid look-ahead bias, i.e. the model performs the trade one period after the signal
        candles["direction"] = (
            candles["direction"].shift(1).replace(np.nan, DirectionEnum.HOLD)
        )
        gains, bot_actions = get_bot_results(candles, amount)
        candles["gains"] = gains
        candles["bot_actions"] = bot_actions
        return candles
