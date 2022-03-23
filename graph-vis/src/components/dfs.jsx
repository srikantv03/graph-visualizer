
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid, FormHelperText, Slider} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



function DepthFirst() {
    const [cols, setCols] = useState(5);
    const [rows, setRows] = useState(5);
    const [obstacles, setObstacles] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(24);
    const [path, setPath] = useState({});
    const [running, setRunning] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1);

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
            await sleep(1/animationSpeed * 250);
            returnValue = await dfsHelper(visited, nx, ny, m, n, v + 1);
            if (returnValue) {
              break;
            }
          }
        }
        visited[x][y] = false;
        if (!returnValue) {
          await sleep(1/animationSpeed * 250);
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

    var data = []
    for (var i = 0; i < cols; i++) {
      data.push([])
      for (var j = 0; j < rows; j++) {
        data[i].push((rows * i) + j)
      }
    }

    const rowOptions = Array.from({length: 25}, (_, index) => index + 1);
    const colOptions = Array.from({length: 10}, (_, index) => index + 1);

    const valuetext = (value) => {
      setAnimationSpeed(value);
      return `${value}x`;
    }

    return (
      <React.Fragment>      
      <Grid container sx={{height: 100}} spacing={3}>
        <Grid container padding={10} spacing={3}>
          <Grid item xs={12}>
            <h2>Depth-First Search</h2>
            <p>Depth-first search is a very common algorithm used in computer science. This algorithm will fully traverse a single path, backtrack on that path, and continue with this process. This depth-first search algorithm is recursively implemented.</p>
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
          <Slider
            aria-label="Animation Speed"
            defaultValue={1}
            getAriaValueText={valuetext}
            step={0.25}
            marks
            min={0.25}
            max={2}
            valueLabelDisplay="on"
          />
          <p>Animation Speed</p>
          </Grid>
          <Grid item xs={3}>
            <Button color="primary" variant="contained" style={{height: "100%", width: "100%"}} onClick={dfsSearch} endIcon={<ArrowRightIcon fontSize="large" />}>DFS</Button>
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
          <Grid item xs={12}>
          <Link to="bredth-first" smooth={true} duration={500}>
            <IconButton aria-label="delete" size="small">
              <ArrowDropDownCircleIcon fontSize="small" />
            </IconButton>
          </Link>
          </Grid>
          </Grid> 
      </Grid>
    </React.Fragment>
    );
}
 
export default DepthFirst;
      
