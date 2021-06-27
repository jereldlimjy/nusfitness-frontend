import {
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
  table: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
}));

const Booking = ({ handleAlert, loggedIn }) => {
  const classes = useStyles();
  const [slots, setSlots] = useState([]);

  // Retrieve booked slots
  useEffect(() => {
    const url = `${
      window.location.hostname === "localhost"
        ? "http://localhost:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }bookedSlots`;
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) =>
        setSlots(
          res.map((e) => ({ facility: e.facility, date: new Date(e.date) }))
        )
      )
      .catch((err) => console.log(err));
  }, []);
  console.log(slots);
  return (
    <div className={classes.root}>
      {!loggedIn ? (
        <Dashboard />
      ) : (
        <Fragment>
          <Typography variant="h4" align="center">
            View Bookings
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Facility</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map((slot) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
