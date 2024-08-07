import { createContext, ReactNode, useEffect, useState } from "react";
import { GraphData } from "../../models/graph";
import { StrategyEnum, TimeFrameEnum } from "../../models/trading-models";
import { getGraphData } from "../common/graph-utils";

type GraphContextType = {
  graphData: GraphData;
  setGraphData: (data: GraphData) => void;
};

export const GraphContext = createContext<GraphContextType>({
  graphData: {
    dataPoints: [],
    symbol: "",
    strategy: StrategyEnum.OBV,
    period: TimeFrameEnum.DAY,
  },
  setGraphData: () => {},
});

type Props = {
  children: ReactNode;
};

export function GraphContextProvider({ children }: Props) {
  const [graphData, setGraphData] = useState<GraphData>({
    dataPoints: [],
    symbol: "",
    strategy: StrategyEnum.OBV,
    period: TimeFrameEnum.DAY,
  });

  useEffect(() => {
    async function getInitialGraphData() {
      const initialGraphData = await getGraphData(
        "AAPL",
        StrategyEnum.OBV,
        TimeFrameEnum.DAY,
        1000,
        new Date("2021-01-01"),
        new Date("2021-01-10")
      );
      setGraphData(initialGraphData);
    }

    getInitialGraphData();
  }, []);

  return (
    <GraphContext.Provider value={{ graphData, setGraphData }}>
      {children}
    </GraphContext.Provider>
  );
}
