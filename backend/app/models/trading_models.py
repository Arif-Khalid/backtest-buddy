from enum import Enum
from alpaca.data.timeframe import TimeFrame


class TimeFrameEnum(Enum):
    DAY = "day"
    MINUTE = "minute"
    HOUR = "hour"
    WEEK = "week"
    MONTH = "month"

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
    OBV = "obv"
    RSI = "rsi"
    MACD = "macd"
    SMA = "SMA"
    BOLLINGERBANDS = "bb"
    STOCHASTICOSCILLATOR = "stoch"
    ADX = "adx"
    CDLMORNINGSTAR = "morningstar"
    CDL3WHITESOLDIERS = "3whitesoldiers"
    CDL3BLACKCROWS = "3blackcrows"
    CDLIDENTICAL3CROWS = "identical3crows"
    CDLEVENINGSTAR = "eveningstar"
    CDLCONCEALBABYSWALL = "concealbabyswall"
    CDL3LINESTRIKE = "3linestrike"
