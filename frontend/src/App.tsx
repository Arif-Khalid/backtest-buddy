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
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import Header from "./components/Header";
import FormInput from "./components/FormInput";

// Main theme
// #E69812
// #A0CED9
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({
  colors: {
    customOrange: {
      100: "#fcf7ee",
      200: "#f9e1b8",
      300: "#f6ce89",
      400: "#f2ba59",
      500: "#f0b429",
      600: "#c18a22",
      700: "#91611a",
      800: "#613815",
      900: "#30200d",
    },
    customBlue: {
      100: "#edf6f8",
      200: "#c8e3e9",
      300: "#a4d0db",
      400: "#7fbddc",
      500: "#5ba9ce",
      600: "#48879e",
      700: "#36656f",
      800: "#24433f",
      900: "#12211f",
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        default: "gray.100",
        _dark: "gray.900",
      },
      secondary: {
        default: "customBlue.600",
        _dark: "customBlue.400",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "secondary",
      },
    },
  },
  config,
});

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
    <ChakraProvider theme={theme}>
      <Box bg="primary" minHeight="100vh" padding={4}>
        <Container maxW="80%" width="80%" display="flex" flexDirection="column">
          <Header />
          <Divider mb={5} />
          <ResponsiveContainer width="100%" height={500}>
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
