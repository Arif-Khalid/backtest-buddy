export type GraphDataPoint = {
  timestamp: Date;
  return: number;
  open: number;
  close: number;
  signal: string;
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
