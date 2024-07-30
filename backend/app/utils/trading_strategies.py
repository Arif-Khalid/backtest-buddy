import pandas as pd
from app.models.trading_models import DirectionEnum, StrategyEnum
from talib import abstract
import numpy as np


def get_strategy_directions(df: pd.DataFrame, strategy: StrategyEnum):
    strategy_res = None
    direction_res = []
    match strategy:
        case StrategyEnum.OBV:
            strategy_res = abstract.OBV(df)
            for value in strategy_res:
                if value > 0:
                    direction_res.append(DirectionEnum.BUY)
                else:
                    direction_res.append(DirectionEnum.SELL)
        case StrategyEnum.RSI:
            strategy_res = abstract.RSI(df)
            pass
        case StrategyEnum.MACD:
            strategy_res = abstract.MACD(df)
            pass
        case StrategyEnum.SMA:
            strategy_res = abstract.SMA(df)
            pass
        case StrategyEnum.BOLLINGERBANDS:
            strategy_res = abstract.BBANDS(df)
            pass
        case StrategyEnum.STOCHASTICOSCILLATOR:
            strategy_res = abstract.STOCH(df)
            pass
        case StrategyEnum.ADX:
            strategy_res = abstract.ADX(df)
            pass
        case StrategyEnum.CDLMORNINGSTAR:
            strategy_res = abstract.CDLMORNINGSTAR(df)
            pass
        case StrategyEnum.CDL3WHITESOLDIERS:
            strategy_res = abstract.CDL3WHITESOLDIERS(df)
            pass
        case StrategyEnum.CDL3BLACKCROWS:
            strategy_res = abstract.CDL3BLACKCROWS(df)
            pass
        case StrategyEnum.CDLIDENTICAL3CROWS:
            strategy_res = abstract.CDLIDENTICAL3CROWS(df)
            pass
        case StrategyEnum.CDLEVENINGSTAR:
            strategy_res = abstract.CDLEVENINGSTAR(df)
            pass
        case StrategyEnum.CDLCONCEALBABYSWALL:
            strategy_res = abstract.CDLCONCEALBABYSWALL(df)
            pass
        case StrategyEnum.CDL3LINESTRIKE:
            strategy_res = abstract.CDL3LINESTRIKE(df)
            pass
        case _:
            raise ValueError("Invalid strategy")

    return direction_res


def get_returns(df: pd.DataFrame, amount: float):
    positions = []
    returns = []
    prevDirection = None
    for _, row in df.iterrows():
        gain = 0
        if row["direction"] == DirectionEnum.BUY and prevDirection != DirectionEnum.BUY:
            # Close sell positions
            for position in positions:
                gain += (1 - row["open"] / position) * amount
            prevDirection = DirectionEnum.BUY
            positions.append(row["open"])
        elif (
            row["direction"] == DirectionEnum.SELL
            and prevDirection != DirectionEnum.SELL
        ):
            # Close buy positions
            for position in positions:
                gain += (row["open"] / position - 1) * amount
            prevDirection = DirectionEnum.SELL
            positions.append(row["open"])
        returns.append(gain)

    return np.cumsum(returns)
