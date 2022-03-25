
import React, {useState, useRef, useEffect, setOpen} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid, FormHelperText, Modal, Box, Card, Divider } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { integerPropType } from "@mui/utils";
import "./../App.css";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50vw",
    height: "70vh",
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

const dividerStyle ={
    margin: 5
}

function Header() {
    const rows = 20;
    const cols = 12;
    const canvasRef = useRef(null);
    var delta = 0;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [worms, setWorms] = useState([[
        [1, 2],
        [1, 3],
        [2, 3],
        [3, 3]
    ]])

    const anim = (time) => {
        if (time - delta > 500) {
            console.log(time)
            delta += 500;
            var tempWorms = [...worms];
            for (var i = 0; i < tempWorms.length; i++) {
                tempWorms[i].shift();
                let worm = tempWorms[i];
                var potentials = [];
                var steps = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (var step of steps) {
                    const nx = worm[worm.length - 1][0] + step[0];
                    const ny = worm[worm.length - 1][1] + step[1];
                    if (nx > 0 && nx < rows && ny > 0 && nx < cols) {
                        potentials.push([nx, ny]);
                    }
                }
                tempWorms[i].push(potentials[Math.floor(Math.random() * potentials.length)]);
            }
            setWorms([...tempWorms])
            plot();
        }
        requestAnimationFrame(anim);
    }

    // useEffect(() => {
    //     while(canvasRef.current == null) {
    //         setTimeout(() => {}, 200);
    //     }
    //     requestAnimationFrame(anim);

    // }, []);

    const plot = () => {
        const canvas = canvasRef.current;
        if (canvas != null && canvas != undefined) {
            const context = canvas.getContext('2d');
            const width = context.canvas.width;
            const height = context.canvas.height;
            const rstep = (width - 20) / 20;
            const cstep = (height - 16) / 12;

            context.clearRect(0, 0, width, height);
            
            for(var worm of worms) {
                console.log(worm);
                if (worm.length > 1) {
                context.beginPath();
                context.moveTo(10 + worm[0][0] * rstep, 8 + worm[0][1] * cstep);
                    for (var i = 1; i < worm.length; i++) {
                        context.lineTo(10 + worm[i][0] * rstep, 8 + worm[i][1] * cstep);
                        context.stroke();
                        context.moveTo(10 + worm[i][0] * rstep, 8 + worm[i][1] * cstep);
                    }
                }
            }
        }
        
    }

    return (
        // <div>
        // <div style={{height: "100%", justifyContent: "center", textAlign: "center"}} id='header-container'>
        //     <canvas height="700px" width="1500px" ref={canvasRef} style={{backgroundColor: "white"}} ></canvas>
        //     <div id="overlay">
        //         yessir bro
        //     </div>
        // </div>
        // </div>
        <React.Fragment>
            <div className="outer-header-div">
                <div className="header-div">
                    <h1 className="header-text">Graph Algorithm Visualizer</h1>
                    <h3 className="secondary-header-text">Srikant Vasudevan</h3>
                    <Grid item xs={12}>
                        <Button onClick={handleOpen} sx={{padding: 2}} color="primary" variant="outlined">
                            How to use
                        </Button>
                        
                        <Button sx={{padding: 2}} color="secondary" variant="outlined">
                            Source Code
                        </Button>
                    </Grid>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                {/*
                                    TODO: move the following instructions into the instructions component and use env to store the actual text
                                */}
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Introduction:
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Firstly, I'm glad you decided to give this application a shot. I have put a lot of effort into making
                                    this application both fun to use, but also informative. Below, I have outlined how to use this visualizer
                                    to maximize your learning experience!
                                </Typography>
                                <Divider sx={dividerStyle}/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Basic Use:
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    This visualizer currently has 2 algorithms:
                                    <ul>
                                        <li>Depth-first Search</li>
                                        <li>Breadth-first Search</li>
                                    </ul>
                                    Each of these algorithms occupies a section of the application and is intended to be explored modularly.
                                    For each algorithm, a group of options is presented to the user, mostly relating to the structure of a matrix
                                    or graph. These options will allow the user to mess around with the algorithm, test edge cases, and understand
                                    the core of how the algorithm works in a visual context.
                                </Typography>
                                <Divider sx={dividerStyle}/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Matrix-based Algorithms:
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Searching in an empty matrix is kind of boring. There will always be a way to get to the end, whether it be traversing
                                    every element of the matrix, or simply going through the perimeter.
                                    <br />
                                    As of now, we have the following options for our matrix operations:
                                    <ul>
                                        <li><strong>Rows:</strong> This controls the number of rows in the matrix (max 10)</li>
                                        <li><strong>Columns:</strong> This controls the number of columns in the matrix (max 10)</li>
                                        <li><strong>Animation Speed:</strong> This controls the multiplier, from 0.25x to 2x of a speed of 4 operations/sec</li>
                                        <li><strong>Show Numbers:</strong> If interested in the paths being traversed, a user could enable the number count, where each traversed grid item would display its ordering in its path.</li>
                                    </ul>
                                    In these modules, you are able to visualize a standard search through a partially blocked matrix using a specified method. A general rule of thumb: depth-first search is good to verify the existance
                                    of a path and breadth-first search is good to find the shortest path.
                                    <h3>Specialized Matrix Algorithms</h3>
                                    In addition to the standard implementations of DFS and BFS, I have also added a few specialized implementations of these algorithms.
                                    These implementations can be seen widely in competitive programming, interview problems, and even real-world applications.
                                    <br />
                                    The current specializations of DFS and BFS in this application are:
                                    <ul>
                                        <li><strong>Word Search:</strong> Searching for an ASCII string within a matrix only using standard vertical or horizontal movements</li>    
                                        <li><strong>Dijkstra's Algorithm:</strong> Finding the shortest path traversal through a graph using BFS</li>
                                    </ul> 

                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <br/>
                                    Don't forget to have fun with it!
                                    <br/>
                                    Srikant Vasudevan :)
                                </Typography>
                            </Box>
                        </Modal>            
                    </div>
                </div>
            </div>

        </React.Fragment>
        
    );
}
 
export default Header;
      