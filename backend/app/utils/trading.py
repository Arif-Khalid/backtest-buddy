import os
from dotenv import load_dotenv
from alpaca.data.historical.stock import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from alpaca.data.models.bars import BarSet
import pandas as pd
import numpy as np
import datetime
from app.core.config import Settings


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
        timeframe: TimeFrame,
        start: datetime.datetime,
        end: datetime.datetime = None,
    ) -> pd.DataFrame:

        stockBarsRequest = StockBarsRequest(
            symbol_or_symbols=symbol,
            timeframe=timeframe,
            start=start,
            end=end,
        )
        stockBars = self.stock_historical_data_client.get_stock_bars(stockBarsRequest)
        return self.stock_bars_to_DF(stockBars, symbol)
