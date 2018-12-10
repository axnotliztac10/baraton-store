import React, { Component } from 'react';
import { MuiThemeProvider , createMuiTheme } from '@material-ui/core/styles';

import './App.css';

import Store from './containers/Store';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#000'
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Store />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
