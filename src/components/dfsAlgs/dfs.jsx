import React, { useState } from "react";
import "./../../App.css";
import Algorithm from "../../view/algorithm";

const strings = require("./../../static/strings.json");

export default function DepthFirst(props) {
  const dfs = async (options) => {
    const { cols, rows, setRunning, setObstacles, ...rest } = options;
    let m = cols - 1;
    let n = rows - 1;
    let visited = [];
    for (let i = 0; i < cols; i++) {
      visited.push([]);
      for (let j = 0; j < rows; j++) {
        visited[i].push(false);
      }
    }
    setRunning(true);
    const returnValue = await dfsHelper(visited, 0, 0, m, n, 0, options);
    setRunning(false);
    setObstacles([]);
  };

  const dfsHelper = async (visited, x, y, m, n, v, options) => {
    console.log();
    const { obstacles, setPath, setTimeout, path, sleep, animationSpeed } =
      options;
    let cellId = x * (n + 1) + y;
    if (x == m && y == n) {
      let cellId = x * (n + 1) + y;
      path[cellId] = v;
      setPath({ ...path });

      return true;
    } else {
      visited[x][y] = true;
      if (document.querySelector(`div[data-id='${cellId}']`) == null) {
        return false;
      }

      path[cellId] = v;
      setPath({ ...path });

      setTimeout(() => {}, 1000);
      const nextMoves = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      let returnValue = false;

      for (let move of nextMoves) {
        let nx = move[0];
        let ny = move[1];
        if (nx >= visited.length || ny >= visited[0].length) {
          continue;
        }
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx <= n &&
          nx <= m &&
          !visited[nx][ny] &&
          obstacles.indexOf(nx * (n + 1) + ny) == -1
        ) {
          await sleep((1 / animationSpeed) * 250);
          returnValue = await dfsHelper(visited, nx, ny, m, n, v + 1, options);

          if (returnValue) {
            break;
          }
        }
      }
      visited[x][y] = false;
      if (!returnValue) {
        await sleep((1 / animationSpeed) * 250);
        path[cellId] = null;
        setPath({ ...path });
      }

      return returnValue;
    }
  };

  return <Algorithm run={dfs} />;
}
