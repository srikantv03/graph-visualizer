import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

import "./index.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

function App() {
  function fromAdjMatrix(matrix) {
    var gp = {
      nodes: [],
      edges: []
    };
    for (var i = 0; i < matrix.length; i++) {
      gp.nodes.push({ id: i + 1, label: `${i + 1}`, title: `Node: ${i + 1}`});
      for (var j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 1) {
          gp.edges.push({from: i + 1, to: j + 1});
        }
      }
    }
    return gp;
  }

  const matrix = [[0, 1, 1],
  [1, 0, 1],
  [1, 1, 0]];

  const graph = fromAdjMatrix(matrix);
  console.log(graph);

  const options = {
    edges: {
      arrows: {
        to: false,
        from: false
      },
      color: "#000000"
    },
    nodes: {
      shape: "circle"
    },
    layout: {
      hierarchical: false
    },
    height: "1000px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
