import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="body1">
          Edit <code>src/App.tsx</code> and save to reload.
        </Typography>
      </header>
    </Box>
  );
}

export default App;
