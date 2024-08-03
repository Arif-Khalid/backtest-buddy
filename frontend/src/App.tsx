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
import { Box, ChakraProvider, Container, Divider } from "@chakra-ui/react";
import Header from "./components/header/header";
import FormInput from "./components/form-input/form-input";
import customTheme from "./theme/theme";
import { useState } from "react";
import { GraphDataPoint } from "./models/graph";
import CustomToolTip from "./components/custom-tool-tip/custom-tool-tip";
import CustomizedCandle from "./components/cutomized-candle/customized-candle";

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
