// Main theme
// #E69812

import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { DirectionEnum } from "../models/trading-models";

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
      backgroundContrast: {
        default: "gray.900",
        _dark: "gray.300",
      },
      primary: {
        default: "teal.600",
        _dark: "teal.300",
      },
      secondary: {
        default: "blue.600",
        _dark: "blue.300",
      },
      [DirectionEnum.BUY]: {
        default: "green.500",
        _dark: "green.500",
      },
      [DirectionEnum.SELL]: {
        default: "red.500",
        _dark: "red.500",
      },
      [DirectionEnum.HOLD]: {
        default: "orange.400",
        _dark: "orange.400",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: "primary",
      },
    },
    Tag: {
      variants: {
        [DirectionEnum.BUY]: {
          container: {
            backgroundColor: DirectionEnum.BUY,
            color: "white",
          },
        },
        [DirectionEnum.SELL]: {
          container: {
            backgroundColor: DirectionEnum.SELL,
            color: "white",
          },
        },
        [DirectionEnum.HOLD]: {
          container: {
            backgroundColor: DirectionEnum.HOLD,
            color: "white",
          },
        },
        [DirectionEnum.CLOSE_BUYS_AND_SELL]: {
          container: {
            backgroundColor: DirectionEnum.SELL,
            color: "white",
          },
        },
        [DirectionEnum.CLOSE_SELLS_AND_BUY]: {
          container: {
            backgroundColor: DirectionEnum.BUY,
            color: "white",
          },
        },
      },
    },
  },
  config,
});

export default customTheme;
