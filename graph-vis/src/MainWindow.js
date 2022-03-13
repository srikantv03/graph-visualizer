
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid, FormHelperText} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Alert } from "@mui/material";

function MainWindow() {
    const [cols, setCols] = useState(5);
    const [rows, setRows] = useState(5);
    const [obstacles, setObstacles] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(24);
    const [path, setPath] = useState({});
    const [running, setRunning] = useState(false);

    const handleRowChange = (e) => {
      setRows(e.target.value);
      clearGrid();
    }
    const handleColsChange = (e) => {
      setCols(e.target.value);
      clearGrid()
    }

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const clearGrid = () => {
      setObstacles([])
    }

    const bfsSearch = async () => {

    }

    const dfsSearch = async () => {
      var m = cols - 1;
      var n = rows - 1;
      var visited = [];
      for (var i = 0; i < cols; i++) {
        visited.push([])
        for (var j = 0; j < rows; j++) {
          visited[i].push(false);
        }
      }
      setRunning(true)
      var rval =  await dfsHelper(visited, 0, 0, m, n, 0);
      setRunning(false);
      setObstacles([]);
    }



    const dfsHelper = async (visited, x, y, m, n, v) => {
      const obst = [...obstacles];
      var cellId = x * (n + 1) + y;
      if (x == m && y == n) {
        return true;
      } else {
        visited[x][y] = true;
        if (document.querySelector(`div[data-id='${cellId}']`) == null) {
          console.log(cellId);
          return false;
        }

        path[cellId] = v
        setPath({...path});
        console.log(path)

        var nextMoves = [[x - 1, y],[x + 1, y], [x, y - 1], [x, y + 1]];
        var returnValue = false;

        for (var move of nextMoves) {
          var nx = move[0]
          var ny = move[1]
          if (nx >= visited.length || ny >= visited[0].length) {
            continue;
          }
          if (nx >= 0 && ny >= 0 && nx <= n && nx <= m && !visited[nx][ny] && obst.indexOf(nx * (n + 1) + ny) == -1) {
            await sleep(200);
            returnValue = await dfsHelper(visited, nx, ny, m, n, v + 1);
            if (returnValue) {
              break;
            }
          }
        }
        visited[x][y] = false;
        if (!returnValue) {
          await sleep(200);
          let npath = {...path}; 
          delete npath[0];
          setPath({...npath});
          console.log(npath);
          // setTimeout(() => {console.log(path)}, 10);
        }
        return returnValue;
      }
    }

    const editState = (e) => {
      var temp = [...obstacles];
      console.log(temp);
      console.log(e.target.getAttribute('data-id'));
      for (var i = 0; i < temp.length; i++) {
        let val = temp[i];
        if (val == parseInt(e.target.getAttribute('data-id'))) {
          temp.splice(i, 1);
          setObstacles(temp);
          return;
        }
      }
      temp.push(parseInt(e.target.getAttribute('data-id')));
      setObstacles(temp);
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
        </Toolbar>
      </AppBar>
      
      <Grid container spacing={3}>
        <Grid item md={3} xs={0} />
        <Grid item md={6}>
        <Grid container padding={10} spacing={3}>
          <Grid item xs={12}>
            <h1>Depth-First Search</h1>
            <p>Depth-first search is a very common algorithm used in computer science. This algorithm will fully traverse a single path, backtrack on that path, and continue with this process. This depth-first search algorithm is recursively implemented.</p>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <TextField
            select
            id="row-select"
            value={rows}
            variant="outlined"
            label="Rows"
            onChange={handleRowChange}
          >
            {rowOptions.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
            </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth>
              <TextField
              select
              id="col-select"
              label="Columns"
              variant="outlined"
              value={cols}
              onChange={handleColsChange} >
                {colOptions.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
                ))}
            </TextField>
          </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
            <Button color="primary" variant="contained" sx={{height: 1}} onClick={dfsSearch}>DFS</Button>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Alert sx={{textAlign: "center"}} severity={!running ?  "info": "warning"}>{!running ? "There are no algorithms running. Click on a square to toggle it as an obstacle." : "An algorithm is currently running."}</Alert>
          </Grid>
          <Grid item xs={12}>
            <div id="grid" sx={{minHeight: 400, textAlign: "center"}}>
              {data.map((row, index) => (
                <div>
                {row.map(cellId => <div onClick={editState}
                className={`gridItem ${obstacles.includes(cellId) ? "obstacle" : ""}`}
                style={{backgroundColor:
                  cellId in path ? `rgb(0, ${(15-Math.min(rows, cols)) * path[cellId]}, ${255 - ((15-Math.min(rows, cols)) * path[cellId])})`: {}}}
                key={cellId} data-id={cellId}></div>)}
                <br/>
                </div>
              ))}
            </div>
          </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={0} />        
      </Grid>
      

      
    </React.Fragment>
    );
}
 
export default MainWindow;
      
