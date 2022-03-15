
import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { AppBar, Toolbar, IconButton, ListItem, ListItemIcon, Typography, Button,
TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid,
FormHelperText, Drawer, Box, List, ListItemText} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { Alert } from "@mui/material";
import DepthFirst from "./components/dfs.jsx";
import { Link } from "react-scroll";
const drawerWidth = 240;

function MainWindow(props) {
  const [current, setCurrent] = useState(1);
  const sections = 2;
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

  useEffect(() => {
    // subscribe event
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      // unsubscribe event
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);
  const handleOnScroll = () => {
    const a = document.body.clientHeight;
    if (Math.round(sections * 2 * window.scrollY / a) != current) {
      setCurrent(Math.round(sections * 2 * window.scrollY / a));
    }
  }
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
      <Grid container sx={{height: 100}} spacing={3}>
        <Grid item md={3} xs={0}>
          <Box 
          position = "fixed"
          sx={{ overflow: 'auto' }}>
            <List>
              {['Depth First Search', 'Breadth First Search'].map((text, index) => (
                <ListItem key={text}>
                  <Link smooth={true} duration={500} to="bredth-first">
                    <ListItemText sx={{fontWeight: index == current - 1 ? "bold" : "normal"}} primary={text} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item md={6}>
          <section style={sectStyle} id="depth-first">
            <DepthFirst />
          </section>
          <section style={sectStyle} id="bredth-first">
            <DepthFirst />
          </section>    
        </Grid>
        <Grid item md={3} xs={0} />
      </Grid>
        
    </React.Fragment>
    );
}
 
export default MainWindow;
      
