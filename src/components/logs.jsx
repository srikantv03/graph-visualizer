import React, { useState, useRef, useEffect, setOpen } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import {
  AppBar,
  Toolbar,
  IconButton,
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
  Modal,
  Box,
  Card,
  Divider,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { Alert } from "@mui/material";
import { Link } from "react-scroll";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { integerPropType } from "@mui/utils";
import "./../App.css";
const dividerStyle = {
  margin: 5,
};
export default function Logs(props) {
  const logData = props.logs;
  return (
    <div
      style={{
        height: "300px",
        overflowX: "auto",
      }}
    >
      {logData.map((log) => (
        <Alert severity={log.severity}>{log.details}</Alert>
      ))}
    </div>
  );
}
