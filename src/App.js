import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Profile from "./components/Profile";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[700],
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: "#337ab7",
        "&:hover": {
          backgroundColor: "#286090",
        },
        color: "white",
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#337ab7",
        },
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #337ab7",
        },
      },
    },
  },
});

const App = () => {
  const [alert, setAlert] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }isLoggedIn`;
    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(data.authenticated);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/profile">
              <Profile handleAlert={handleAlert} loggedIn={loggedIn} />
            </Route>
            <Route exact path="/register">
              <Register
                handleAlert={handleAlert}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </Route>
            <Route exact path="/login">
              <Login
                handleAlert={handleAlert}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </Route>
            <Route exact path="/">
              <Home
                handleAlert={handleAlert}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
