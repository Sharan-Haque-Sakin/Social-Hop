import { extendTheme } from "@chakra-ui/react";

const theme = {
  styles: {
    global: (props) => ({
      "html,body": {
        fontFamily: "Outfit",
        backgroundColor: props.colorMode === "dark" ? "gray.800" : "#F7F7F7",
        h1: {
          fontFamily: "Outfit",
        },
        h2: {
          fontFamily: "Outfit",
        },
        h3: {
          fontFamily: "Outfit",
        },
      },
    }),
  },
};

const GlobalTheme = extendTheme(theme);

export default GlobalTheme;
