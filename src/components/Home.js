import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Booking from "./Booking";
import Dashboard from "./Dashboard";
import TelegramLogin from "./TelegramLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const Home = ({ handleAlert, loggedIn, setLoggedIn }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loggedIn ? (
        <>
          <TelegramLogin />
          <Booking handleAlert={handleAlert} />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Home;
