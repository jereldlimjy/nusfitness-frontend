import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [alert, setAlert] = useState(null);
  const [loggedIn, setLoggedIn] = useState(undefined);

  const handleAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  useEffect(() => {
    fetch("http://localhost:3000/isLoggedIn", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoggedIn(data.authenticated);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/">
            {loggedIn && (
              <Home
                handleAlert={handleAlert}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
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
        </Switch>
      </div>
    </Router>
  );
};

export default App;
