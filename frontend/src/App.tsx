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
  const { timestamp, open, close, signal } = payload[0]
    .payload as GraphDataPoint;

  return (
    <Card>
      <CardHeader display={"flex"} justifyContent={"space-between"}>
        <Text fontSize={"large"}>Date: {timestamp.toLocaleDateString()}</Text>
        <Tag size="md" variant={signal}>
          {"Signal: " + signal}
        </Tag>
      </CardHeader>
      <CardBody>
        <Text>
          Return: {open} Close: {close} Signal: {signal}
        </Text>
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
        width={10}
        height={yDifference}
        x={openSeriesPoint.x - 5}
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
              <Line type="monotone" dataKey="open" stroke="#8884d8" />
              <Line type="monotone" dataKey="close" stroke="#82ca9d" />
              <Customized component={CustomizedCandle} />
            </LineChart>
          </ResponsiveContainer>
          <FormInput setGraphData={setGraphData} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
