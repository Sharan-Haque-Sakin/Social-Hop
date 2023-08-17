import { extendTheme } from "@chakra-ui/react";

const theme = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const DarkMode = extendTheme({ theme });

export default DarkMode;
