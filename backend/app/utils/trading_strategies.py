import pandas as pd
from app.models.trading_models import StrategyEnum
from talib import abstract


def get_strategy_directions(df: pd.DataFrame, strategy: StrategyEnum):
    strategy_res = None
    direction_res = []
    match strategy:
        case StrategyEnum.OBV:
            strategy_res = abstract.OBV(df)
            for value in strategy_res:
                if value > 0:
                    direction_res.append("Buy")
                else:
                    direction_res.append("Sell")
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
