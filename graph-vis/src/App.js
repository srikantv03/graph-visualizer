import React from "react";
import ReactDOM from "react-dom";
import MainWindow from './MainWindow';
import { ThemeProvider, createTheme } from "@material-ui/core";
import "./index.css";
import "./App.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";




function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
      <MainWindow/>
    </div>
    </ThemeProvider>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
