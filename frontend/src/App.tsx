import "./App.less";
import {
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import { GraphContextProvider } from "./utils/context/graph-context";
import GraphComponent from "./components/graph-component/graph-component";
import customTheme from "./theme/theme";

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <GraphContextProvider>
        <Box bg="background" minHeight="100vh" padding={4}>
          <GraphComponent />
        </Box>
      </GraphContextProvider>
    </ChakraProvider>
  );
}

export default App;
