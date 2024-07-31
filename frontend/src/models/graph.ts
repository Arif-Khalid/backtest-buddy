export type GraphDataPoint = {
  timestamp: Date;
  open: number;
  close: number;
  signal: string;
  gain: number;
  bot_action: string;
  return_to_date: number;
  symbol: string;
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
