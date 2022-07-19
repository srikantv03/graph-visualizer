import { useState, React } from "react";
import ReactDOM from "react-dom";
import MainWindow from "./MainWindow";
import { ThemeProvider, createTheme } from "@material-ui/core";
import "./index.css";
import "./App.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

function App() {
  const hasWindow = typeof window !== "undefined";
  const [dimensions, setDimensions] = useState({
    width: hasWindow ? window.innerWidth : null,
    height: hasWindow ? window.innerHeight : null,
  });

  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainWindow dims={dimensions} />
      </div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
