import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment, useEffect, useState } from "react";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  tableContainer: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },
  circularProgress: {
    margin: "0 auto"
  }
}));

const Booking = ({ handleAlert, loggedIn }) => {
  const classes = useStyles();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState();

  // Retrieve booked slots
  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }bookedSlots`;

    setLoading(true);

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setSlots(
          res.map((e) => ({ facility: e.facility, date: new Date(e.date) }))
        )
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  
  return (
    <div className={classes.root}>
      {!loggedIn ? (
        <Dashboard />
      ) : (
        <Fragment>
          <Typography variant="h4" align="center">
            View Bookings
          </Typography>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Facility</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  slots.map((slot) => (
                    <TableRow key={slot.facility}>
                      <TableCell component="th" scope="row">
                        {slot.facility}
                      </TableCell>
                      <TableCell align="right">
                        {slot.date.toDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {slot.date
                          .toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(":", "")}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          {loading &&
            <Box display="flex" mt={1.5} justifyContent="center">
              <CircularProgress className={classes.circularProgress} />
            </Box>
          }
          {!loading && !slots.length &&
            <Box display="flex" mt={1.5} justifyContent="center">
              <span>No bookings found.</span>
            </Box>
          }
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
