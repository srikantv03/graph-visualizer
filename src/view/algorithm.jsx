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

const strings = require("./../static/strings.json");

export default function Algorithm(props) {
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [obstacles, setObstacles] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(24);
  const [path, setPath] = useState({});
  const [running, setRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  var data = [];
  for (var i = 0; i < cols; i++) {
    data.push([]);
    for (var j = 0; j < rows; j++) {
      data[i].push(rows * i + j);
    }
  }

  const rowOptions = Array.from({ length: 20 }, (_, index) => index + 1);
  const colOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  /**
   * Main 'run' method for the algorithm component, passed in by parent
   */
  const run = () => {
    props.run({
      cols: cols,
      rows: rows,
      setRunning: setRunning,
      setObstacles: setObstacles,
      obstacles: obstacles,
      setPath: setPath,
      setTimeout: setTimeout,
      path: path,
      sleep: sleep,
      animationSpeed: animationSpeed,
    });
  };

  /**
   * Delay the current process by a certain amount of time
   * @param   {int}     milliseconds Amount of time the promise should take to resolve (sleep)
   * @returns {Promise}              Promise that resolves in the specified amount of time
   */
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  /**
   * Change the amount of rows in the grid
   * @param {*} e The selector for rows
   */
  const handleRowChange = (e) => {
    setRows(e.target.value);
    clearGrid();
    setPath({});
  };

  /**
   * Change the amount of columns in the grid
   * @param {*} e The selector for columns
   */
  const handleColsChange = (e) => {
    setCols(e.target.value);
    clearGrid();
    setPath({});
  };

  /**
   * Clear the grid of obstacles and paths
   */
  const clearGrid = () => {
    setObstacles([]);
  };

  /**
   * Calculate the color in the path for a specified cell identifier
   * @param   {int}    cellId Unique identifier for specific cell
   * @returns {Object}        Object containing the CSS for the specified cell
   */
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

  /**
   * Determine the classes for a cell (independent of cell identifier)
   * @param   {int}    cellId Unique identifier for specific cell
   * @returns {string}        Class names for the cell
   */
  const getClassName = (cellId) => {
    const comp = rows;
    let size = "gi-xs";
    if (comp <= 5) {
      size = "gi-large";
    } else if (comp <= 10) {
      size = "gi-medium";
    } else if (comp <= 15) {
      size = "gi-small";
    }

    return `gridItem ${obstacles.includes(cellId) ? "obstacle" : ""} ${size}`;
  };

  /**
   * Toggle obstacle status on a cell that was clicked
   * @param   {*} e The cell on which the event occurred
   */
  const onSetObstacle = (e) => {
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

  /**
   * Converts double slider value to an intuitive string
   * @param   {double} value The numeric value of the slider
   * @returns {string}       The text to be displayed on the slider tooltip
   */
  const valuetext = (value) => {
    setAnimationSpeed(value);
    return `${value}x`;
  };

  const optionStyle = {
    height: "100%",
    width: "100%",
  };

  return (
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
                onClick={run}
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
              <div style={{ height: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div
                    id="grid"
                    style={{
                      minHeight: 400,
                      textAlign: "center",
                    }}
                  >
                    {data.map((row, index) => (
                      <div key={index}>
                        {row.map((cellId) => (
                          <div
                            onClick={onSetObstacle}
                            className={getClassName(cellId)}
                            style={getPathColors(cellId)}
                            key={cellId}
                            data-id={cellId}
                          ></div>
                        ))}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Link to="breadth-first" smooth={true} duration={500}>
            <IconButton aria-label="next" size="large">
              <ArrowDropDownCircleIcon fontSize="medium" />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
