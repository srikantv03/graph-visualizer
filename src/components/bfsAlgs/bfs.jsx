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
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const strings = require("./../../static/strings.json");

export default function BreadthFirst() {
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [obstacles, setObstacles] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(24);
  const [path, setPath] = useState({});
  const [running, setRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showNumbers, setShowNumbers] = useState(true);

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
    setPath({});
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
    console.log(temp);
    console.log(e.target.getAttribute("data-id"));
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

  return (
    <div className="glass-card">
      <Grid container sx={{ height: 100 }} spacing={3}>
        <Grid item md={4} xs={12}>
          <Grid container padding={10} spacing={3}>
            <Grid item xs={12}>
              <h2>Breadth-First Search</h2>
              <p>{strings.BFS_DESCRIPTION}</p>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
              {/* <p>Animation Speed</p> */}
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
                color="primary"
                variant="contained"
                style={{ height: "100%", width: "100%" }}
                onClick={bfsSearch}
                endIcon={<ArrowRightIcon fontSize="large" />}
                disabled={running}
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
                  <div>
                    {row.map((cellId) => (
                      <div
                        onClick={editState}
                        className={`gridItem ${
                          obstacles.includes(cellId) ? "obstacle" : ""
                        }`}
                        style={{
                          backgroundColor:
                            cellId in path
                              ? `rgb(0, ${
                                  (30 - Math.min(rows, cols)) * path[cellId]
                                }, ${
                                  255 -
                                  (30 - Math.min(rows, cols)) * path[cellId]
                                })`
                              : {},
                        }}
                        key={cellId}
                        data-id={cellId}
                      >
                        {/* {showNumbers && cellId in path ? `${path[cellId]}` : ""} */}
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
      </Grid>
    </div>
  );
}
