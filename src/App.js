// import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#337ab7",
        "&:hover": {
          backgroundColor: "#286090"
        },
        color: "white"
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#337ab7"
        }
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #337ab7"
        }
      }
    }
  }
});

const App = () => {
  const [ alert, setAlert ] = useState(null);
  const [ loggedIn, setLoggedIn ] = useState(false);
 
  const handleAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/'>
                <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            </Route>
            <Route exact path='/register'>
                <Register handleAlert={handleAlert} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
            <Route exact path='/login'>
              <Login handleAlert={handleAlert} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
