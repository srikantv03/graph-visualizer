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
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const strings = require("./../../static/strings.json");

export default function BreadthFirstShortest() {
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [obstacles, setObstacles] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(24);
  const [path, setPath] = useState({});
  const [running, setRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [placingState, setPlacingState] = useState("obstacles");
  const [rog, setRog] = useState(0);

  const handleRowChange = (e) => {
    setRows(e.target.value);
    clearGrid();
  };

  const handleColsChange = (e) => {
    setCols(e.target.value);
    clearGrid();
  };

  const handleRogChange = (e) => {
    console.log(e.target.value);
    setRog(parseInt(e.target.value));
  };

  const handlePlacingStateChange = (e) => {
    console.log(e.target.value);
    setPlacingState(e.target.value);
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const clearGrid = () => {
    setObstacles([]);
    setPath({});
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

    if (cellId == start) {
      return {
        backgroundColor: `green`,
      };
    } else if (cellId == end) {
      return {
        backgroundColor: "red",
      };
    }
    return { color: "black" };
  };

  const bfsSearch = async () => {
    var m = cols - 1;
    var n = rows - 1;
    setRunning(true);
    var rval = await bfsHelper(0, 0, m, n);
    setRunning(false);
    //   setObstacles([]);
  };

  const bfsHelper = async (x, y, m, n) => {
    const obst = [...obstacles];
    var dq = [];
    dq.push([x, y, 0]);
    var visited = [];
    for (var i = 0; i < cols; i++) {
      visited.push([]);
      for (var j = 0; j < rows; j++) {
        visited[i].push(false);
      }
    }
    visited[x][y] = true;

    while (dq.length > 0) {
      const vals = dq.shift();
      if (vals[0] == m && vals[1] == n) {
        return true;
      }
      var cellId = vals[0] * (n + 1) + vals[1];

      path[cellId] = vals[2];
      setPath({ ...path });
      console.log(path);

      const nextMoves = [
        [vals[0], vals[1] + 1],
        [vals[0], vals[1] - 1],
        [vals[0] + 1, vals[1]],
        [vals[0] - 1, vals[1]],
      ];

      for (var move of nextMoves) {
        const nx = move[0];
        const ny = move[1];
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx <= m &&
          ny <= n &&
          !visited[nx][ny] &&
          !obst.includes(cellId)
        ) {
          console.log(nx);
          console.log(ny);
          await sleep((1 / animationSpeed) * 250);
          visited[nx][ny] = true;
          dq.push([nx, ny, vals[2] + 1]);
        }
      }
    }
    return false;
  };

  const editState = (e) => {
    var temp = [...obstacles];

    const efs = {
      start: setStart,
      end: setEnd,
      obstacles: setObstacles,
    };

    const editFunction = efs[placingState];
    console.log(editFunction);
    for (var i = 0; i < temp.length; i++) {
      let val = temp[i];
      if (val == parseInt(e.target.getAttribute("data-id"))) {
        temp.splice(i, 1);
        editFunction(temp);
        return;
      }
    }
    temp.push(parseInt(e.target.getAttribute("data-id")));
    editFunction(temp);
  };

  const rowOptions = Array.from({ length: 25 }, (_, index) => index + 1);
  const colOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  const valuetext = (value) => {
    setAnimationSpeed(value);
    return `${value}x`;
  };

  let data = [];
  for (let i = 0; i < cols; i++) {
    data.push([]);
    for (let j = 0; j < rows; j++) {
      data[i].push(rows * i + j);
    }
  }

  const rng = (max) => {
    return Math.floor(Math.random() * max);
  };

  const generateRandomObstacles = () => {
    let iter = rog;
    console.log(iter);
    let temp = [];

    if (rows * cols - obstacles.length < iter) {
      return;
    }
    while (iter > 0) {
      let randomNumber = rng(rows * cols);
      if (!temp.includes(randomNumber)) {
        temp.push(randomNumber);
        --iter;
      }
      console.log(iter);
    }
    setObstacles(temp);
  };

  return (
    <div className="glass-card">
      <Grid container sx={{ height: 100 }} spacing={3}>
        <Grid container padding={10} spacing={3}>
          <Grid item xs={12}>
            <h2>Breadth-First Search Shortest Path</h2>
            <p>{strings.BFS_DESCRIPTION}</p>
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
                onChange={handleColsChange}
              >
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
            {/* <p>Animation Speed</p> */}
          </Grid>
          <Grid item xs={3}>
            <Button
              color="primary"
              variant="contained"
              style={{ height: "100%", width: "100%" }}
              onClick={bfsSearch}
              endIcon={<ArrowRightIcon fontSize="large" />}
            >
              {strings.RUN_BUTTON}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <TextField
              style={{ height: "100%", width: "100%" }}
              variant="outlined"
              label="Search String"
              onChange={handleRogChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              style={{ height: "100%", width: "100%" }}
              onClick={generateRandomObstacles}
              endIcon={<ArrowRightIcon fontSize="large" />}
            >
              {"rng"}
            </Button>
          </Grid>
          <Grid item xs={8}>
            <ToggleButtonGroup
              value={placingState}
              exclusive
              onChange={handlePlacingStateChange}
              aria-label="text alignment"
            >
              <ToggleButton value="start" aria-label="left aligned">
                Set Starting Point
              </ToggleButton>
              <ToggleButton value="obstacles" aria-label="centered">
                Set Obstacles
              </ToggleButton>
              <ToggleButton value="end" aria-label="right aligned">
                Set Ending Point
              </ToggleButton>
            </ToggleButtonGroup>
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
                  {row.map((cellId) => (
                    <div
                      onClick={editState}
                      className={`gridItem ${
                        obstacles.includes(cellId) ? "obstacle" : ""
                      }`}
                      style={getPathColors(cellId)}
                      key={cellId}
                      data-id={cellId}
                    >
                      {cellId in path && !obstacles.includes(cellId)
                        ? `${path[cellId]}`
                        : ""}
                    </div>
                  ))}

                  <br />
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Link to="dfs-word-search" smooth={true} duration={500}>
              <IconButton aria-label="delete" size="small">
                <ArrowDropDownCircleIcon fontSize="small" />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
