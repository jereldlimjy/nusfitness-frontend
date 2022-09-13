import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { lightBlue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: "none",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  appBar: {
    backgroundColor: lightBlue[700],
  },
}));

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const classes = useStyles();

  const handleLogout = (e) => {
    e.preventDefault();
    const url = `${process.env.BACKEND_URL}/logout`;
    fetch(url, {
      credentials: "include",
    }).catch((err) => console.log(err));

    setLoggedIn(false);
  };
  return (
    <nav className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              NUSFitness
            </Link>
          </Typography>
          {loggedIn ? (
            <Fragment>
              <Button>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
              </Button>
              <Button>
                <Link to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
              </Button>
              <Button>
                <Link to="/profile" className={classes.link}>
                  Profile
                </Link>
              </Button>
              <Button>
                <Link to="/" onClick={handleLogout} className={classes.link}>
                  Logout
                </Link>
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </Button>
              <Button>
                <Link to="/register" className={classes.link}>
                  Register
                </Link>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
