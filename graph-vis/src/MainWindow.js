
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

function MainWindow() {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(1);
    const [obstacles, setObstacles] = useState(2);
    const [start, setStart] = useState(3);
    const [end, setEnd] = useState(4);

    const handleRowChange = (e) => setRows(e.target.value);
    const handleColsChange = (e) => setCols(e.target.value);

    const dfsSearch = () => {
      var m = cols - 1;
      var n = rows - 1;
      var visited = [];
      for (var i = 0; i < cols; i++) {
        visited.push([])
        for (var j = 0; j < rows; j++) {
          visited[i].push(false);
        }
      }
      console.log(m)
      console.log(n)
      const obst = [...obstacles];
      console.log(obst);
      return dfsHelper(visited, 0, 0, m, n)
    }

    const dfsHelper = (visited, x, y, m, n) => {
      const obst = [...obstacles];
      if (x == m && y == n) {
        return true;
      } else {
        visited[x][y] = true;
        if (document.querySelector(`div[data-id='${x * (n + 1) + y}']`) == null) {
          console.log(x * (n + 1) + y);
          return false;
        }
        document.querySelector(`div[data-id='${x * (n + 1) + y}']`).classList.add("pathObject");
        var nextMoves = [[x - 1, y],[x + 1, y], [x, y - 1], [x, y + 1]];
        console.log(nextMoves)
        var returnValue = false;
        for (var move of nextMoves) {
          console.log(move);
          var nx = move[0]
          var ny = move[1]

          if (nx >= 0 && ny >= 0 && nx <= n && nx <= m && !visited[nx][ny] && obst.indexOf(`${((nx * (n + 1) + ny))}`) == -1) {
            console.log(visited);
            returnValue = setTimeout(() => dfsHelper(visited, nx, ny, m, n), 500);
            console.log(returnValue);
            if (returnValue) {
              break;
            }
          }
        }
        // visited[x][y] = false;
        return returnValue;
      }
    }


    const editState = (e) => {
      if (obstacles instanceof Array) {
        var temp = [...obstacles];
      } else {
        var temp = [];
      }
      console.log(temp);
      console.log(e.target.getAttribute('data-id'));
      for (var i = 0; i < temp.length; i++) {
        let val = temp[i];
        if (val == e.target.getAttribute('data-id')) {
          temp.splice(i, 1);
          setObstacles(temp);
          e.target.className = "gridItem";
          return;
        }
      }
      temp.push(e.target.getAttribute('data-id'));
      setObstacles(temp);
      e.target.className = "gridItem obstacle";
    }

    const classes = makeStyles((theme) => ({
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

    var data = []
    for (var i = 0; i < cols; i++) {
      data.push([])
      for (var j = 0; j < rows; j++) {
        data[i].push((rows * i) + j)
      }
    }

    const rowOptions = Array.from({length: 25}, (_, index) => index + 1);
    const colOptions = Array.from({length: 10}, (_, index) => index + 1);
    return (
      <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={async () => {await this.colorSwitch();}} />
          <Typography className={classes.title} variant="h6" noWrap>
            Graph Algorithm Visualization Tool
          </Typography>
          <Button onClick={dfsSearch}>DFS</Button>
        </Toolbar>
      </AppBar>
      

      <Select
        labelId="row-select-label"
        id="row-select"
        value={rows}
        label="Number of Rows"
        onChange={handleRowChange}
      >
        {rowOptions.map((value) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>
      <Select
        labelId="col-select-label"
        id="col-select"
        value={cols}
        label="Age"
        onChange={handleColsChange}
      >
        {colOptions.map((value) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>

      <h1>Click to add obstacles</h1>
      <div id="grid">
        {data.map((row, index) => (
          <div>
          {row.map(cellId => <div onClick={editState} className="gridItem" key={cellId} data-id={cellId}></div>)}
          <br/>
          </div>
        ))}
      </div>
    </React.Fragment>
    );
}
 
export default MainWindow;
      
