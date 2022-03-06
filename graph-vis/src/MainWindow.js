
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField} from '@material-ui/core';
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
    console.log(data)
    
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
      <TextField onChange={handleRowChange}></TextField>
      <TextField onChange={handleColsChange}></TextField>
      <div id="grid">
        {data.map((row, index) => (
          <div>
          {row.map(cellId => <div className="gridItem" key={cellId}>{cellId}</div>)}
          <br/>
          </div>
        ))}
      </div>
    </React.Fragment>
    );
}
 
export default MainWindow;
      
