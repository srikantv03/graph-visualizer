import React, { useState } from "react";
import {
  IconButton,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Grid,
  Slider,
} from "@material-ui/core";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import "./../../App.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const strings = require("./../../static/strings.json");

export default function DepthFirst(props) {
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
  };
  const handleColsChange = (e) => {
    setCols(e.target.value);
    clearGrid();
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const clearGrid = () => {
    setObstacles([]);
  };

  const getPathColors = (cellId) => {
    if (cellId in path && path[cellId] != null) {
      let color = "black";
      if ((15 - Math.min(rows, cols)) * path[cellId] < 128) {
        color = "white";
      }
      return {
        backgroundColor: `rgb(0, ${
          (15 - Math.min(rows, cols)) * path[cellId]
        }, ${255 - (15 - Math.min(rows, cols)) * path[cellId]})`,
        color: color,
      };
    }
    return { color: "black" };
  };

  const dfsSearch = async () => {
    var m = cols - 1;
    var n = rows - 1;
    var visited = [];
    for (var i = 0; i < cols; i++) {
      visited.push([]);
      for (var j = 0; j < rows; j++) {
        visited[i].push(false);
      }
    }
    setRunning(true);
    var rval = await dfsHelper(visited, 0, 0, m, n, 0);
    setRunning(false);
    setObstacles([]);
  };

  const dfsHelper = async (visited, x, y, m, n, v) => {
    const obst = [...obstacles];
    var cellId = x * (n + 1) + y;
    if (x == m && y == n) {
      let cellId = x * (n + 1) + y;
      path[cellId] = v;
      setPath({ ...path });

      return true;
    } else {
      visited[x][y] = true;
      if (document.querySelector(`div[data-id='${cellId}']`) == null) {
        return false;
      }

      path[cellId] = v;
      setPath({ ...path });

      setTimeout(() => {}, 1000);
      var nextMoves = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      var returnValue = false;

      for (var move of nextMoves) {
        var nx = move[0];
        var ny = move[1];
        if (nx >= visited.length || ny >= visited[0].length) {
          continue;
        }
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx <= n &&
          nx <= m &&
          !visited[nx][ny] &&
          obst.indexOf(nx * (n + 1) + ny) == -1
        ) {
          await sleep((1 / animationSpeed) * 250);
          props.addLog({
            severity: returnValue ? "success" : "warning",
            details: `(${nx}, ${ny})`,
          });
          returnValue = await dfsHelper(visited, nx, ny, m, n, v + 1);

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
      }

      return returnValue;
    }
  };

  const editState = (e) => {
    var temp = [...obstacles];
    for (var i = 0; i < temp.length; i++) {
      let val = temp[i];
      if (val == parseInt(e.target.getAttribute("data-id"))) {
        temp.splice(i, 1);
        setObstacles(temp);
        return;
      }
    }
    temp.push(parseInt(e.target.getAttribute("data-id")));
    setObstacles(temp);
  };

  var data = [];
  for (var i = 0; i < cols; i++) {
    data.push([]);
    for (var j = 0; j < rows; j++) {
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
          <Grid item md={4} xs={12}>
            <Grid container padding={10} spacing={3}>
              <Grid item xs={12}>
                <h2>Depth-First Search</h2>
                <p>{strings.DFS_DESCRIPTION}</p>
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={12}>
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
                <Button
                  sx={optionStyle}
                  style={{ height: "60px", width: "100%" }}
                  color="primary"
                  variant="contained"
                  onClick={dfsSearch}
                  endIcon={<ArrowRightIcon fontSize="large" />}
                >
                  {strings.RUN_BUTTON}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid container padding={10} spacing={3}>
              <Grid item xs={12}>
                <div id="grid" sx={{ minHeight: 400, textAlign: "center" }}>
                  {data.map((row, index) => (
                    <div key={index}>
                      {row.map((cellId) => (
                        <div
                          onClick={editState}
                          className={`gridItem ${
                            obstacles.includes(cellId) ? "obstacle" : ""
                          }`}
                          style={getPathColors(cellId)}
                          key={cellId}
                          data-id={cellId}
                        ></div>
                      ))}
                      <br />
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Link to="breadth-first" smooth={true} duration={500}>
              <IconButton aria-label="delete" size="large">
                <ArrowDropDownCircleIcon fontSize="large" />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
