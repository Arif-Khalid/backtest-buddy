import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import {
  Box,
  Heading,
  IconButton,
  Tooltip as ChakraTooltip,
} from "@chakra-ui/react";
import { FaFileExcel } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
} from "recharts";
import { Divider } from "@chakra-ui/react";
import Header from "../header/header";
import CustomToolTip from "../custom-tool-tip/custom-tool-tip";
import CustomizedCandle from "../customized-candle/customized-candle";
import FormInput from "../form-input/form-input";
import { GraphContext } from "../../utils/context/graph-context";
import { exportGraphDataToExcel } from "../../utils/common/excel-utils";
import GraphTitleToolTip from "../graph-title-tool-tip/graph-title-tool-tip";
import AdditionalInformation from "../additional-information/additional-information";
export default function GraphComponent() {
  const { graphData } = useContext(GraphContext);
  const graphDataPoints = graphData.dataPoints;
  const isGraphPopulated = graphData.dataPoints.length > 0;
  return (
    <Container maxW="80%" width="80%" display="flex" flexDirection="column">
      <Header />
      <Divider mb={5} />
      {isGraphPopulated && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            <Heading as="h3" fontSize="md" marginBottom={2}>
              {graphData.strategy} strategy on {graphData.symbol} from{" "}
              {graphDataPoints[0].timestamp.toLocaleDateString()} to{" "}
              {graphData.dataPoints[
                graphData.dataPoints.length - 1
              ].timestamp.toLocaleDateString()}
            </Heading>
            <AdditionalInformation>
              <GraphTitleToolTip
                strategy={graphData.strategy}
                symbol={graphData.symbol}
              />
            </AdditionalInformation>
          </Box>
          <ChakraTooltip label="Export to Excel" color="tertiary">
            <IconButton
              color="secondary"
              icon={<FaFileExcel />}
              aria-label="Export to excel"
              onClick={() => exportGraphDataToExcel(graphData)}
            />
          </ChakraTooltip>
        </Box>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={500} height={500} data={graphData.dataPoints}>
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
      <FormInput />
    </Container>
  );
}
