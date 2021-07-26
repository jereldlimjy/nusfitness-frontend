import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey, lightBlue } from "@material-ui/core/colors";
import React from "react";
import Booking from "./Booking";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginBottom: theme.spacing(1.5),
    color: blueGrey[200],
  },
}));

const Home = ({ handleAlert, loggedIn, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <CircularProgress className={classes.circularProgress} />
        </Box>
      ) : loggedIn ? (
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
