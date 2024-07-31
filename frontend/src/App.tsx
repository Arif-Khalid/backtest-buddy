import {
  CartesianGrid,
  Customized,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import "./App.less";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Container,
  Divider,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import customTheme from "./theme/theme";
import { useState } from "react";
import { RechartsCustomizedProps, GraphDataPoint } from "./models/graph";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { roundToDecimalPlaces } from "./utils/common/helper";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const CustomToolTip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  const {
    timestamp,
    open,
    close,
    signal,
    gain,
    return_to_date,
    bot_action,
    symbol,
  } = payload[0].payload as GraphDataPoint;

  return (
    <Card>
      <CardHeader
        display={"flex"}
        columnGap={"1rem"}
        justifyContent={"space-between"}
      >
        <StatGroup>
          <Stat>
            <StatLabel>{symbol}</StatLabel>
            <StatNumber>{roundToDecimalPlaces(close, 2)} USD</StatNumber>
            <StatHelpText>
              <StatArrow type={close - open >= 0 ? "increase" : "decrease"} />
              {roundToDecimalPlaces((close - open) / open, 2)}%
            </StatHelpText>
          </Stat>
        </StatGroup>
        <StatGroup>
          <Stat>
            <StatLabel>{"Returns To Date"}</StatLabel>
            <StatNumber>{return_to_date} USD</StatNumber>
            <StatHelpText>
              <StatArrow type={gain >= 0 ? "increase" : "decrease"} />
              {gain} USD
            </StatHelpText>
          </Stat>
        </StatGroup>
      </CardHeader>
      <CardBody display="flex" flexDirection="column" rowGap={"0.5rem"}>
        <Text>
          Date: {timestamp.toLocaleDateString()}{" "}
          {timestamp.toLocaleTimeString()}
        </Text>
        <Tag size="md" variant={signal} width={"fit-content"}>
          Signal: {signal}
        </Tag>
        <Tag size="md" variant={bot_action} width={"fit-content"}>
          Bot Action: {bot_action}
        </Tag>
      </CardBody>
    </Card>
  );
};

// Necessary to receive unknown type props since type handling for custom components in Recharts is not well documented.
const CustomizedCandle = (props: unknown) => {
  const [openSeries, closedSeries] = (props as RechartsCustomizedProps)
    .formattedGraphicalItems!;
  return openSeries.props.points.map((openSeriesPoint, index) => {
    const closedSeriesPoint = closedSeries.props.points[index];
    const yDifference = openSeriesPoint.y - closedSeriesPoint.y;

    return (
      <Rectangle
        key={openSeriesPoint.payload.timestamp.toLocaleString()}
        width={5}
        height={yDifference}
        x={openSeriesPoint.x - 2.5}
        y={closedSeriesPoint.y}
        fill={yDifference > 0 ? "green" : "red"}
      />
    );
  });
};

function App() {
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  return (
    <ChakraProvider theme={customTheme}>
      <Box bg="background" minHeight="100vh" padding={4}>
        <Container maxW="80%" width="80%" display="flex" flexDirection="column">
          <Header />
          <Divider mb={5} />
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
              <Line type="linear" dataKey="open" stroke="" dot={false} />
              <Line type="linear" dataKey="close" stroke="" dot={false} />
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
