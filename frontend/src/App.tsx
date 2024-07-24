import "./App.less";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

function App() {
  return <ChakraProvider theme={theme}>
    
  </ChakraProvider>;
}

export default App;
