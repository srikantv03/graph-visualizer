
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid, FormHelperText} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { Alert } from "@mui/material";
import DepthFirst from "./components/dfs.jsx";
import { Link } from "react-scroll";

function MainWindow(props) {
  console.log(props);
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
  const sectStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };
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
      <section style={sectStyle}>
        <DepthFirst />
        <br/>
      </section>
      <section style={sectStyle} id="depth-first">
        <DepthFirst />
      </section>      
    </React.Fragment>
    );
}
 
export default MainWindow;
      
