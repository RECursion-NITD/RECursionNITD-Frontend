import ReactDOM from "react-dom/client";
import "./index.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
const theme = extendTheme({
  colors: {
    background: "#000000",
    surface: "#1B1D1E",
    outline: "#807769",
    heading: "#5E95D2",
    subHeading: "#B3B1AD",
    tertiaryText: "#EF6041",
    primary: "#0062CC",
  },
  fonts: {
    Montserrat: "Montserrat",
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>
);
