import { DirectionEnum, StrategyEnum, TimeFrameEnum } from "./trading-models";

export type GraphDataPoint = {
  timestamp: Date;
  open: number;
  close: number;
  signal: DirectionEnum;
  gain: number;
  bot_action: DirectionEnum;
  return_to_date: number;
};

export type GraphData = {
  dataPoints: GraphDataPoint[];
  symbol: string;
  strategy: StrategyEnum;
  period: TimeFrameEnum;
};

export type RechartsCustomizedProps = {
  formattedGraphicalItems: RechartsFormattedGraphicalItem[] | null;
};

export type RechartsFormattedGraphicalItem = {
  props: RechartsFormattedGraphicalItemProps;
};

export type RechartsFormattedGraphicalItemProps = {
  points: RechartsDataPoint[];
};

export type RechartsDataPoint = {
  payload: GraphDataPoint;
  x: number;
  y: number;
};
