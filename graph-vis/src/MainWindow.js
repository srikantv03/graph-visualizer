
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

function MainWindow() {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(1);

    const handleRowChange = (e) => setRows(e.target.value);
    const handleColsChange = (e) => setCols(e.target.value);

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
      
      <FormControl fullWidth>
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
      
    </FormControl>
      <div id="grid">
        {data.map((row, index) => (
          <div>
          {row.map(cellId => <div className="gridItem" key={cellId}></div>)}
          <br/>
          </div>
        ))}
      </div>
    </React.Fragment>
    );
}
 
export default MainWindow;
      
