import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import SwitchButton from "Components.js";

import "./index.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [
      theme.breakpoints.up('sm')]: {
        display: 'block',
    },
  },
}));

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Welcome To GFG
          </Typography>
              <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
      />
    </div>

  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
