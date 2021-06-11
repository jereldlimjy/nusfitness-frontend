import React from "react";
import Booking from "./Booking";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
        <Booking handleAlert={handleAlert} />
      ) : (
        <Typography variant="h4" align="center">
          Welcome to NUSFitness! :)
        </Typography>
      )}
    </div>
  );
};

export default Home;
