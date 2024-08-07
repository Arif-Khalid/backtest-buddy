import { GraphData, GraphDataPoint } from "../../models/graph";
import {
  DirectionEnum,
  StrategyEnum,
  TimeFrameEnum,
} from "../../models/trading-models";
import { strategiesApi } from "../api/strategies";
import { roundToDecimalPlaces } from "./helper";

export function getEnumExplanation(
  enumToExplain: StrategyEnum | string
): string {
  switch (enumToExplain) {
    case StrategyEnum.OBV:
      return "On-balance volume (OBV) is a technical trading momentum indicator that uses volume flow to predict changes in stock price.";
    case "AAPL":
      return "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.";
    default:
      return "No explanation available";
  }
}

export async function getGraphData(
  symbol: string,
  strategy: string,
  period: string,
  amount: number,
  startDate: Date,
  endDate: Date
): Promise<GraphData> {
  const data = await strategiesApi.getStrategies(
    symbol,
    strategy,
    period,
    amount,
    startDate!,
    endDate!
  );

  const newGraphDataPoints: GraphDataPoint[] = [];
  let return_to_date = 0;
  for (let i = 0; i < data["gains"].length; i++) {
    return_to_date = roundToDecimalPlaces(return_to_date + data["gains"][i], 2);

    // Can push symbol directly here even though setState might be called before query completes because react does not mutate state, meaning that the symbol will be the same as when the query was made and the new symbol object created by setState will not be used
    newGraphDataPoints.push({
      timestamp: new Date(data["timestamps"][i]),
      open: data["open"][i],
      close: data["close"][i],
      signal: data["directions"][i] as DirectionEnum,
      gain: data["gains"][i],
      return_to_date,
      bot_action: data["bot_actions"][i] as DirectionEnum,
    });
  }

  const newGraphData = {
    dataPoints: newGraphDataPoints,
    symbol,
    strategy: strategy as StrategyEnum,
    period: period as TimeFrameEnum,
  };

  return newGraphData;
}
