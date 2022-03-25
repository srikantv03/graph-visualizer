import React, {useState} from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {AppBar, Card, Toolbar, IconButton, Typography, Button, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid, FormHelperText, Slider} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './../App.css';

const algorithms = [
    {name: "Breadth-first search"},
    {name: "Depth-first search"}
]

export default function GridSelect() {
    return (
        <Card
        height={600}
        width={800}
        >   
            <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
            >
            {algorithms.map((item) => (
                <Grid item xs={3}>
                    <Card className="clickable-card">
                        <h3>{item.name}</h3>
                    </Card>
                </Grid>
            ))}
            
            
            </Grid> 
        </Card>
    );
}