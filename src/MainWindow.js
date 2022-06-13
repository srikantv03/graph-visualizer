import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {
  AppBar,
  Toolbar,
  IconButton,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  FormHelperText,
  Drawer,
  Box,
  List,
  ListItemText,
  ListItemButton,
  Divider,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Header from "./components/header.jsx";
import { Alert } from "@mui/material";
import DepthFirst from "./components/dfsAlgs/dfs.jsx";
import BreadthFirst from "./components/bfsAlgs/bfs.jsx";
import { Link } from "react-scroll";
import GridSelect from "./components/gridSelect";
import ParticleAnim from "./components/anim/particles";
import WordSearchDFS from "./components/dfsAlgs/wordSearch.jsx";

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
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  }));

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  const sectStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
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
  };

  const dataStyle = {
    position: "absolute",
  };
  return (
    <React.Fragment>
      <ParticleAnim />
      <Header />
      {/* <GridSelect/> */}
      <Grid container sx={{ height: 100 }} spacing={3}>
        <Grid item md={2} xs={2}>
          {/* <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemLink>
          </List> */}
        </Grid>
        <Grid item md={8} xs={8}>
          <section style={sectStyle} id="depth-first">
            <DepthFirst />
          </section>
          <section style={sectStyle} id="breadth-first">
            <BreadthFirst />
          </section>
          <section style={sectStyle} id="dfs-word-search">
            <WordSearchDFS />
          </section>
        </Grid>
        <Grid item md={3} xs={0} />
      </Grid>
    </React.Fragment>
  );
}

export default MainWindow;
