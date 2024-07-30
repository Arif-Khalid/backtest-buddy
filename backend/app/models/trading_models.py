from enum import Enum
from alpaca.data.timeframe import TimeFrame


class TimeFrameEnum(Enum):
    DAY = "DAY"
    MINUTE = "MINUTE"
    HOUR = "HOUR"
    WEEK = "WEEK"
    MONTH = "MONTH"

    def to_timeframe(self) -> TimeFrame:
        if self == TimeFrameEnum.DAY:
            return TimeFrame.Day
        elif self == TimeFrameEnum.MINUTE:
            return TimeFrame.Minute
        elif self == TimeFrameEnum.HOUR:
            return TimeFrame.Hour
        elif self == TimeFrameEnum.WEEK:
            return TimeFrame.Week
        elif self == TimeFrameEnum.MONTH:
            return TimeFrame.Month
        else:
            raise ValueError("Invalid timeframe")


class StrategyEnum(Enum):
    OBV = "OBV"
    RSI = "RSI"
    MACD = "MACD"
    SMA = "SMA"
    BOLLINGERBANDS = "BBANDS"
    STOCHASTICOSCILLATOR = "STOCH"
    ADX = "ADX"
    CDLMORNINGSTAR = "MORNINGSTAR"
    CDL3WHITESOLDIERS = "3WHITESOLDIERS"
    CDL3BLACKCROWS = "3BLACKCROWS"
    CDLIDENTICAL3CROWS = "IDENTICAL3CROWS"
    CDLEVENINGSTAR = "EVENINGSTAR"
    CDLCONCEALBABYSWALL = "CONCEALBABYSWALL"
    CDL3LINESTRIKE = "3LINESTRIKE"


class DirectionEnum(Enum):
    BUY = "BUY"
    SELL = "SELL"
    HOLD = "HOLD"
