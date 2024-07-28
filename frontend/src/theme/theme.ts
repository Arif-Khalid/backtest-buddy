// Main theme
// #E69812

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// #A0CED9
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
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
      background: {
        default: "white",
        _dark: "gray.900",
      },
      primary: {
        default: "teal.600",
        _dark: "teal.300",
      },
      secondary: {
        default: "blue.600",
        _dark: "blue.300",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "primary",
      },
    },
  },
  config,
});

export default customTheme;
