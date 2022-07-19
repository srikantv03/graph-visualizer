import React from "react";
import { Alert } from "@mui/material";
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
