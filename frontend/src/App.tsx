import {
  CartesianGrid,
  Customized,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.less";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Icon,
} from "@chakra-ui/react";
import Header from "./components/header/header";
import FormInput from "./components/form-input/form-input";
import customTheme from "./theme/theme";
import { useEffect, useState } from "react";
import { GraphDataPoint } from "./models/graph";
import CustomToolTip from "./components/custom-tool-tip/custom-tool-tip";
import CustomizedCandle from "./components/cutomized-candle/customized-candle";
import { FaQuestionCircle } from "react-icons/fa";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import GraphTitleToolTip from "./components/graph-title-tool-tip/graph-title-tool-tip";
import { getGraphData } from "./utils/common/graph-utils";
import { StrategyEnum, TimeFrameEnum } from "./models/trading-models";

function App() {
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  const isGraphPopulated = graphData.length > 0;

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
    <ChakraProvider theme={customTheme}>
      <Box bg="background" minHeight="100vh" padding={4}>
        <Container maxW="80%" width="80%" display="flex" flexDirection="column">
          <Header />
          <Divider mb={5} />
          {isGraphPopulated && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="start"
              alignItems="start"
            >
              <Heading as="h3" fontSize="md" marginBottom={2}>
                {graphData[0].strategy} strategy on {graphData[0].symbol} from{" "}
                {graphData[0].timestamp.toLocaleDateString()} to{" "}
                {graphData[graphData.length - 1].timestamp.toLocaleDateString()}
              </Heading>
              <ChakraTooltip
                label={
                  <GraphTitleToolTip
                    strategy={graphData[0].strategy}
                    symbol={graphData[0].symbol}
                  />
                }
              >
                <Box marginTop={-2}>
                  <Icon
                    as={FaQuestionCircle}
                    boxSize={3}
                    color="secondary"
                  ></Icon>
                </Box>
              </ChakraTooltip>
            </Box>
          )}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart width={500} height={500} data={graphData}>
              <CartesianGrid />
              <XAxis
                dataKey={"timestamp"}
                stroke={"#48879e"}
                tickFormatter={(timestamp: Date) => {
                  return timestamp.toLocaleDateString();
                }}
              />
              <YAxis stroke={"#48879e"} />
              <Tooltip content={<CustomToolTip />} />
              <Legend />
              <Line type="linear" dataKey="open" stroke="red" dot={false} />
              <Line type="linear" dataKey="close" stroke="green" dot={false} />
              <Line
                type="linear"
                dataKey="return_to_date"
                stroke="purple"
                dot={false}
              />
              <Customized component={CustomizedCandle} name="lebron" />
            </LineChart>
          </ResponsiveContainer>
          <FormInput setGraphData={setGraphData} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
