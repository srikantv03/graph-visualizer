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
  Tab,
  Tabs,
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
import StickyBox from "react-sticky-box";
import Logs from "./components/logs.jsx";

function MainWindow(props) {
  const [current, setCurrent] = useState(1);
  const [sideTab, setSideTab] = useState(0);
  const [stateLogs, setStateLogs] = useState([]);
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

  const addLog = (newLog) => {
    let logs = [...stateLogs];
    logs.push(newLog);
    // setStateLogs(logs);
  };

  const clearLogs = () => {
    setStateLogs([]);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleOnScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleOnScroll);
  //   };
  // }, []);

  const handleOnScroll = () => {
    const a = document.body.clientHeight;
    if (sections * Math.round(window.scrollY / a) != current) {
      setCurrent(sections * Math.round(window.scrollY / a));
      console.log(Math.round(window.scrollY / a));
    }
  };

  const matchParentStyle = {
    height: "80%",
    width: "100%",
  };

  const handleSideTabChange = (e, nv) => {
    setSideTab(nv);
  };

  return (
    <React.Fragment>
      {/* <ParticleAnim /> */}
      <Header />
      <div style={{ padding: "20px" }}>
        <Grid container sx={{ height: 100 }} spacing={3} margin={20}>
          <Grid item md={3} xs={0}>
            <StickyBox>
              <section style={sectStyle}>
                <div className="glass-card" style={matchParentStyle}>
                  <Tabs
                    value={sideTab}
                    onChange={handleSideTabChange}
                    centered
                    variant="fullWidth"
                  >
                    <Tab
                      label="Navigation"
                      onClick={() => {
                        setSideTab(0);
                      }}
                    />
                    <Tab
                      label="Logs"
                      onClick={() => {
                        setSideTab(1);
                      }}
                    />
                  </Tabs>
                  <div
                    style={{
                      display: sideTab == 0 ? "block" : "none",
                    }}
                  >
                    <List component="nav" aria-label="dfs links">
                      <ListItem button>
                        <ListItemText primary="Depth First Search (DFS)" />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary="Word Search (DFS Implementation)" />
                      </ListItem>
                    </List>
                    <Divider />

                    <List
                      component="nav"
                      aria-label="secondary mailbox folders"
                    >
                      <ListItem button>
                        <ListItemText primary="Breadth First Search (BFS)" />
                      </ListItem>
                    </List>
                  </div>
                  <div
                    style={{
                      display: sideTab == 0 ? "none" : "block",
                      padding: "10px",
                      overflowX: "auto",
                    }}
                  >
                    <Logs logs={stateLogs} />
                  </div>
                </div>
              </section>
            </StickyBox>
          </Grid>
          <Grid item md={9} xs={9}>
            <section style={sectStyle} id="depth-first">
              <DepthFirst addLog={addLog} />
            </section>
            <section style={sectStyle} id="breadth-first">
              <BreadthFirst />
            </section>
            <section style={sectStyle} id="dfs-word-search">
              <WordSearchDFS />
            </section>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default MainWindow;
