import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Booking from "./Booking";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const Home = ({ handleAlert, loggedIn, setLoggedIn }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loggedIn ? (
        <Box mt={2}>
          <Booking handleAlert={handleAlert} />
        </Box>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Home;
