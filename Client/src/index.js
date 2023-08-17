import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import GlobalTheme from "./Theme/Global";
import DarkMode from "./Theme/DarkMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={GlobalTheme}>
      <ColorModeScript initialColorMode={DarkMode.theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </BrowserRouter>
);

reportWebVitals();
