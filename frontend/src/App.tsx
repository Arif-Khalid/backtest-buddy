import {
  CartesianGrid,
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
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import customTheme from "./theme/theme";

function App() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <ChakraProvider theme={customTheme}>
      <Box bg="background" minHeight="100vh" padding={4}>
        <Container maxW="80%" width="80%" display="flex" flexDirection="column">
          <Header />
          <Divider mb={5} />
          <ResponsiveContainer width="100%" height={400}>
            <LineChart width={500} height={500} data={data}>
              <CartesianGrid />
              <XAxis dataKey={"name"} stroke={"#48879e"} />
              <YAxis stroke={"#48879e"} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <FormInput />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
