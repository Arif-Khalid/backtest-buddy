import { createContext, ReactNode, useEffect, useState } from "react";
import { GraphData } from "../../models/graph";
import { StrategyEnum, TimeFrameEnum } from "../../models/trading-models";
import { getGraphData } from "../common/graph-utils";
import { useToast } from "@chakra-ui/react";
import { FEEDBACK_MESSAGES } from "../../constants/feedback-messages";

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
  const toast = useToast();

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

    toast.promise(getInitialGraphData(), {
      success: {
        title: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_SUCCESS_TITLE,
        description: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_SUCCESS_DESC,
        duration: 3000,
        isClosable: true,
      },
      loading: {
        title: FEEDBACK_MESSAGES.INITIAL_GRAPH_DATA_LOADING_TITLE,
        description: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_DESC,
        isClosable: true,
      },
      error: {
        title: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_ERROR_TITLE,
        description: FEEDBACK_MESSAGES.GRAPH_DATA_LOADING_ERROR_DESC,
        duration: 3000,
        isClosable: true,
      },
    });
  }, [toast]);

  return (
    <GraphContext.Provider value={{ graphData, setGraphData }}>
      {children}
    </GraphContext.Provider>
  );
}
