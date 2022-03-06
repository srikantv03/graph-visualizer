import React from "react";
import ReactDOM from "react-dom";
import MainWindow from './MainWindow';
import "./index.css";
import "./App.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";




function App() {
  return (
    <div className="App">
      <MainWindow/>
    </div>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
