import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { AppBar, Toolbar, IconButton, ListItem, ListItemIcon, Typography, Button,
TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid,
FormHelperText, Drawer, Box, List, ListItemText} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Header from './components/header.jsx';
import { Alert } from "@mui/material";
import DepthFirst from "./components/dfs.jsx";
import BreadthFirst from "./components/bfs.jsx";
import { Link } from "react-scroll";
import GridSelect from "./components/gridSelect";
import ParticleAnim from "./components/anim/particles";

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
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);
  const handleOnScroll = () => {
    const a = document.body.clientHeight;
    if (sections * Math.round(window.scrollY / a) != current) {
      setCurrent(sections * Math.round(window.scrollY / a));
      console.log(Math.round(window.scrollY / a));
    }
  }

  const dataStyle={
    position: "absolute"
  }
    return (
      <React.Fragment>
      <ParticleAnim />
      <Header/>
      <GridSelect/>
      <Grid container sx={{height: 100}} spacing={3}>
        <Grid item md={3} xs={0}>
          <Box 
          position = "fixed"
          sx={{ overflow: 'auto' }}>
            <List>
              {['Depth First Search', 'Breadth First Search'].map((text, index) => (
                <ListItem key={text}>
                  <Link smooth={true} duration={500} to="breadth-first">
                    <Typography style={{fontWeight:  index == current ? "bold": "normal"}}>{text} {index}</Typography>
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
          <section style={sectStyle} id="breadth-first">
            <BreadthFirst />
          </section>    
        </Grid>
        <Grid item md={3} xs={0} />
      </Grid>
    </React.Fragment>
    );
}
 
export default MainWindow;
      
