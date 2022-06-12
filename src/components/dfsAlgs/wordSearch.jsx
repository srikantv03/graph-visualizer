import React, { useState } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Card,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  FormHelperText,
  Slider,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import "./../../App.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function WordSearchDFS() {
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [obstacles, setObstacles] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(24);
  const [path, setPath] = useState({});
  const [running, setRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [searchString, setSearchString] = useState("word");
  const [gridData, setGridData] = useState([
    ["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "j"],
    ["k", "l", "m", "n", "o"],
    ["p", "q", "r", "s", "t"],
    ["u", "v", "w", "x", "z"],
  ]);

  const handleRowChange = (e) => {
    setRows(e.target.value);
    clearGrid();
  };

  const handleColsChange = (e) => {
    setCols(e.target.value);
    clearGrid();
  };

  const handleSearchWordChange = (e) => {
    setSearchString(e.target.value);
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const clearGrid = () => {
    setObstacles([]);
  };

  const dfsSearch = async () => {
    let visited = [];
    for (let i = 0; i < cols; i++) {
      visited.push([]);
      for (let j = 0; j < rows; j++) {
        visited[i].push(false);
      }
    }
    setRunning(true);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (gridData[i][j] == searchString[0]) {
          let rval = await dfsHelper(visited, i, j, 0);
          if (rval) {
            setRunning(false);
            return rval;
          }
          console.log(rval);
          clearGrid();
        }
      }
    }

    setRunning(false);
  };

  const dfsHelper = async (visited, x, y, v) => {
    let m = cols - 1;
    let n = rows - 1;
    if (v == searchString.length - 1) {
      let cellId = x * (n + 1) + y;
      path[cellId] = v;
      setPath({ ...path });

      return true;
    } else {
      console.log(v);
      const searchLetter = searchString[v + 1];
      let cellId = x * (n + 1) + y;
      visited[x][y] = true;

      if (document.querySelector(`div[data-id='${cellId}']`) == null) {
        return false;
      }

      path[cellId] = v;
      setPath({ ...path });
      // console.log(path);

      let nextMoves = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      let returnValue = false;

      for (let move of nextMoves) {
        let nx = move[0];
        let ny = move[1];
        if (nx >= visited.length || ny >= visited[0].length) {
          continue;
        }
        console.log(searchLetter);
        if (nx >= 0 && ny >= 0 && nx <= n && nx <= m) {
          console.log(gridData[nx][ny]);
        }

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx <= n &&
          nx <= m &&
          !visited[nx][ny] &&
          searchLetter == gridData[nx][ny]
        ) {
          await sleep((1 / animationSpeed) * 250);
          returnValue = await dfsHelper(visited, nx, ny, v + 1);
          if (returnValue) {
            break;
          }
        }
      }

      visited[x][y] = false;
      if (!returnValue) {
        await sleep((1 / animationSpeed) * 250);
        path[cellId] = null;
        setPath({ ...path });
        setTimeout(() => {
          console.log(path);
        }, 10);
        console.log(cellId in path && path[cellId] != null);
      }
      return returnValue;
    }
  };

  const randomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const generateGrid = () => {
    let newGrid = [];
    for (let i = 0; i < cols; i++) {
      newGrid.push([]);
      for (let j = 0; j < rows; j++) {
        newGrid[i].push(randomLetter());
      }
    }
    setGridData(newGrid);
    console.log(newGrid);
  };

  let data = [];

  for (let i = 0; i < cols; i++) {
    data.push([]);
    for (let j = 0; j < rows; j++) {
      data[i].push(rows * i + j);
    }
  }

  const rowOptions = Array.from({ length: 25 }, (_, index) => index + 1);
  const colOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const valuetext = (value) => {
    setAnimationSpeed(value);
    return `${value}x`;
  };

  const optionStyle = {
    height: "100%",
    width: "100%",
  };

  return (
    <React.Fragment>
      <div className="glass-card">
        <Grid container sx={{ height: 100 }} spacing={3}>
          <Grid container padding={10} spacing={3}>
            <Grid item xs={12}>
              <h2>DFS Word Search</h2>
              <p>
                This is an implementation of a DFS traversal where we search for
                a string in a graph of characters.
              </p>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  sx={optionStyle}
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
                  sx={optionStyle}
                  select
                  id="col-select"
                  label="Columns"
                  variant="outlined"
                  value={cols}
                  onChange={handleColsChange}
                >
                  {colOptions.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                sx={optionStyle}
                variant="outlined"
                label="Search String"
                onChange={handleSearchWordChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={optionStyle}
                color="secondary"
                variant="contained"
                onClick={generateGrid}
                endIcon={<ArrowRightIcon fontSize="large" />}
              >
                RANDOM GRID
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={optionStyle}
                color="primary"
                variant="contained"
                onClick={dfsSearch}
                endIcon={<ArrowRightIcon fontSize="large" />}
              >
                RUN ALGORITHM
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Alert
                sx={{ textAlign: "center" }}
                severity={!running ? "info" : "warning"}
              >
                {!running
                  ? "There are no algorithms running. Click on a square to toggle it as an obstacle."
                  : "An algorithm is currently running."}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <div id="grid" sx={{ minHeight: 400, textAlign: "center" }}>
                {data.map((row, index) => (
                  <div>
                    {row.map((cellId, rowIndex) => (
                      <div
                        className={`gridItem`}
                        style={{
                          backgroundColor:
                            cellId in path && path[cellId] != null
                              ? `rgb(0, ${
                                  (15 - Math.min(rows, cols)) * path[cellId]
                                }, ${
                                  255 -
                                  (15 - Math.min(rows, cols)) * path[cellId]
                                })`
                              : {},
                        }}
                        key={cellId}
                        data-id={cellId}
                      >
                        {gridData[index][rowIndex]}
                      </div>
                    ))}
                    <br />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Link to="breadth-first" smooth={true} duration={500}>
                <IconButton aria-label="delete" size="small">
                  <ArrowDropDownCircleIcon fontSize="small" />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
