import * as React from 'react';
import { render } from 'react-dom';

import {
  createTheme,
  MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';

import App from './App';

import './index.css';

// override theme
const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('app-root')
);
