import {
  Box,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { blueGrey, lightBlue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { addDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SlotContainer from "./SlotContainer";
import Timetable from "./Timetable";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  box: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "50%",
  },
  button: {
    padding: theme.spacing(1.5, 2),
    cursor: "pointer",
    border: 0,
    borderRadius: 5,
    backgroundColor: lightBlue[600],
    color: "white",
    "&:hover": {
      backgroundColor: lightBlue[800],
    },
  },
  circularProgress: {
    marginBottom: theme.spacing(1.5),
    color: blueGrey[200],
  },
  paper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    paddingTop: theme.spacing(2),
  },
}));

// Weekday and weekend slots for all facilities
const facilities = [
  {
    name: "Kent Ridge Swimming Pool",
    weekdayHours: [
      "0730",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    weekendHours: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
  },
  {
    name: "University Town Swimming Pool",
    weekdayHours: [
      "0730",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    weekendHours: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
  },
  {
    name: "Kent Ridge Gym",
    weekdayHours: [
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
    ],
    weekendHours: [],
  },
  {
    name: "University Sports Centre Gym",
    weekdayHours: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    weekendHours: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
  },
  {
    name: "University Town Gym",
    weekdayHours: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
    weekendHours: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
  },
  {
    name: "Wellness Outreach Gym",
    weekdayHours: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
    weekendHours: [],
  },
];

const Booking = ({ handleAlert }) => {
  const classes = useStyles();

  const [facility, setFacility] = useState(facilities[0]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [bookedSlots, setBookedSlots] = useState([]);
  const [allBookedSlots, setAllBookedSlots] = useState([]);
  const [slotCount, setSlotCount] = useState([]);
  const [submitValue, setSubmitValue] = useState("Book");
  const [openDialog, setOpenDialog] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Date object
  const now = new Date();
  const day = now.getDay();

  console.log(history.location.state);

  useEffect(() => {
    async function getCreditsLeft() {
      const url = `${
        window.location.hostname === "local.nusfitness.com"
          ? "http://local.nusfitness.com:5000/"
          : "https://salty-reaches-24995.herokuapp.com/"
      }creditsLeft`;

      setLoading(true);

      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      setCreditsLeft(data.credits);
      setLoading(false);
    }

    getCreditsLeft();
  }, []);

  // Changing facility
  const handleFacilityChange = (e) => {
    setFacility(
      facilities.filter((facility) => facility.name === e.target.value)[0]
    );
    setSelectedSlot({});
  };

  // Changing a slot
  const handleSlotChange = (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      setSelectedSlot({
        date: new Date(checkbox.attributes.date.value),
      });
    } else {
      setSelectedSlot({});
    }

    // Update submit value
    const selectedSlot = {
      date: new Date(checkbox.attributes.date.value),
    };
    Object.keys(selectedSlot).length !== 0 &&
      (bookedSlots.find(
        (slot) => slot.date.getTime() === selectedSlot.date.getTime()
      )
        ? setSubmitValue("Cancel")
        : setSubmitValue("Book"));
  };

  // Submit booking
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (submitValue === "Cancel") {
        const url = `${
          window.location.hostname === "local.nusfitness.com"
            ? "http://local.nusfitness.com:5000/"
            : "https://salty-reaches-24995.herokuapp.com/"
        }cancel`;

        setLoading(true);

        fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facility: facility.name,
            ...selectedSlot,
          }),
          credentials: "include",
        })
          .then((response) => {
            if (response.status === 401) {
              setLoading(false);
              handleAlert(
                "You are unauthorised to cancel the slot. Please contact the website's administrator",
                "error"
              );
            } else if (response.status === 403) {
              setLoading(false);
              handleAlert(
                "Unable to cancel slot because it is within the 2 hour cancellation window.",
                "error"
              );
            } else if (response.status === 404) {
              setLoading(false);
              handleAlert(
                "Slot cannot be found. Please contact the website's administrator",
                "error"
              );
            }
            setSelectedSlot({});
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              setLoading(false);
              handleAlert("Your slot has been cancelled.", "success");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const url = `${
          window.location.hostname === "local.nusfitness.com"
            ? "http://local.nusfitness.com:5000"
            : "https://salty-reaches-24995.herokuapp.com"
        }`;

        setLoading(true);

        const res = await fetch(`${url}/updateCredits`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          fetch(`${url}/book`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              facility: facility.name,
              ...selectedSlot,
            }),
            credentials: "include",
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                setLoading(false);
                setCreditsLeft(creditsLeft - 1);
                handleAlert("Your slot has been booked!", "success");
              } else {
                setLoading(false);
                handleAlert("Slot has been fully booked.", "error");
              }
              setSelectedSlot({});
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setLoading(false);
          handleAlert(
            "You have insufficient credits left for this week.",
            "error"
          );
        }
      }
    },
    [submitValue, handleAlert, facility.name, selectedSlot, creditsLeft]
  );

  // Retrieve booked slots
  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }bookedSlots`;

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facility: facility.name,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setBookedSlots(
          res.map((e) => ({ facility: e.facility, date: new Date(e.date) }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handleSubmit, facility.name]);

  // Retrieve all booked slots
  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }bookedSlots`;
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) =>
        setAllBookedSlots(
          res.map((e) => ({ facility: e.facility, date: new Date(e.date) }))
        )
      )
      .catch((err) => console.log(err));
  }, [handleSubmit]);

  // Retrieve slots left
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  useEffect(() => {
    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }slots`;
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facility: facility.name,
        startDate: todayDate,
        endDate: addDays(todayDate, 3),
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) =>
        setSlotCount(
          res.map((e) => ({ date: new Date(e._id), count: e.count }))
        )
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility, selectedSlot]);

  // Handle dialog actions
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };
  const handleClose = () => setOpenDialog(false);

  const slotContainers = [];
  for (let i = 0; i < 3; i++) {
    slotContainers[i] = (
      <SlotContainer
        key={addDays(now, i).toLocaleDateString()}
        facility={facility.name}
        assignedDate={addDays(now, i)}
        hours={
          (day + i) % 7 === 0 || (day + i) % 7 === 6
            ? facility.weekendHours
            : facility.weekdayHours
        }
        handleChange={handleSlotChange}
        selectedSlot={selectedSlot}
        bookedSlots={bookedSlots}
        slotCount={slotCount}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Timetable handleAlert={handleAlert} bookedSlots={allBookedSlots} />

      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" className={classes.header}>
          Book a Facility
        </Typography>
        <Box className={classes.box}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="facility-label">Select Facility</InputLabel>
            <Select
              value={facility.name}
              labelId="facility-label"
              id="facility"
              onChange={handleFacilityChange}
              label="Select Facility"
            >
              {facilities.map((facility, index) => (
                <MenuItem key={index} value={facility.name}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {!loading && (
          <Box display="flex" mt={2} justifyContent="center">
            <Chip
              label={
                <Typography>
                  <strong>Remaining credits this week:</strong> {creditsLeft}
                </Typography>
              }
            />
          </Box>
        )}

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <CircularProgress className={classes.circularProgress} />
            <Typography variant="h5">Processing Your Request...</Typography>
          </Box>
        ) : (
          <form onSubmit={handleClickOpen}>
            {slotContainers}
            {Object.keys(selectedSlot).length !== 0 && (
              <Box display="flex" justifyContent="center">
                <input
                  type="submit"
                  value={submitValue}
                  className={classes.button}
                />
              </Box>
            )}
          </form>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {submitValue === "Book"
            ? "Book selected slot?"
            : "Cancel selected slot?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{`Facility: ${facility.name}`}</DialogContentText>
          <DialogContentText>{`Date: ${
            selectedSlot.date && selectedSlot.date.toDateString()
          }`}</DialogContentText>
          <DialogContentText>{`Hour: ${
            selectedSlot.date &&
            selectedSlot.date
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(":", "")
          }`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={(e) => {
              handleClose();
              handleSubmit(e);
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Booking;
