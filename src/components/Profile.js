import {
  Avatar,
  Box,
  Chip, 
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TelegramLogin from "./TelegramLogin";
  
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      alignItems: "inherit"
    },
  },
  tableContainer: {
    width: "inherit",
  },
  circularProgress: {
    margin: "0 auto",
    color: blueGrey[200]
  },
  profileBox: {
    border: "1px solid grey",
    borderRadius: 12,
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  info: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  chip: {
    marginTop: theme.spacing(2),
  },
  telegramLogin: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    },
  }
}));
  
const Profile = ({ handleAlert, loggedIn }) => {
  const classes = useStyles();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState({});
  const [creditsLeft, setCreditsLeft] = useState();

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

  // Retrieve profile info
  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }profile`;

    fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        console.log(profile);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, []);

  // Get credits left
  useEffect(() => {
    async function getCreditsLeft() {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
      ? "http://local.nusfitness.com:5000/"
      : "https://salty-reaches-24995.herokuapp.com/"
    }creditsLeft`;

    const res = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    setCreditsLeft(data.credits);
    }

    getCreditsLeft();
  }, []);

  
  return (
    <div className={classes.root}>
      {!loggedIn ? (
        <Dashboard />
      ) : (
        <Box display="flex" justifyContent="center" className={classes.container} alignItems="flex-start">
          {/* Profile info and telegram */}
          <Box ml={2} mr={2} flex={3} display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" flexDirection="column" className={classes.profileBox}>
              <Avatar src={`https://robohash.org/${profile.email}?set=set5`} className={classes.avatar} />
              <Typography variant="h6">{profile.email}</Typography>

              <Box className={classes.info} display="flex" flexDirection="column" alignItems="center">
                  <Typography><strong>Joined:</strong> {new Date(profile.joined).toLocaleDateString()}</Typography>
              </Box>
            </Box>

            <Chip className={classes.chip} label={<Typography><strong>Remaining credits this week:</strong> {creditsLeft}</Typography>} />

            <Box display="flex" justifyContent="center" className={classes.telegramLogin}>
              <TelegramLogin />
            </Box>
          </Box>

          {/* Bookings */}
          <Box ml={2} mr={2} display="flex" flexDirection="column" flex={7}>
            <Box display="flex" justifyContent="center" mb={1}>
                <Typography variant="h4">My Bookings</Typography>
            </Box>
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
        </Box>
        </Box>
      )}
    </div>
  );
};

export default Profile;
  