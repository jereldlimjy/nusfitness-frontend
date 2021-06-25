import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import SlotContainer from "./SlotContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  box: {
    display: "flex",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    width: "50%"
  },
  button: {
    padding: theme.spacing(0.5, 2),
    cursor: "pointer",
    border: 0,
    borderRadius: 5,
    backgroundColor: "#1E88E5",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(30, 136, 229, 0.9)"
    }
  }
}));

const Booking = ({ handleAlert }) => {
  const classes = useStyles();

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

  const [facility, setfacility] = useState(facilities[0]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [bookedSlots, setBookedSlots] = useState([]);
  const [submitValue, setSubmitValue] = useState("Book");

  // Date object
  const date = new Date();
  const day = date.getDay();
  Date.prototype.addDays = (days) => {
    /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  // Changing facility
  const handleFacilityChange = (e) => {
    setfacility(facilities[e.target.value]);
    setSelectedSlot({});
  };

  // Changing a slot
  const handleSlotChange = (e) => {
    const checkbox = e.target;

    if (checkbox.checked) {
      setSelectedSlot({
        date: checkbox.attributes.date.value,
        hour: checkbox.attributes.hour.value,
      });
    } else {
      setSelectedSlot({});
    }

    // Update submit value
    const selectedSlot = {
      date: checkbox.attributes.date.value,
      hour: checkbox.attributes.hour.value,
    };
    Object.keys(selectedSlot).length !== 0 &&
      (bookedSlots.find(
        (slot) =>
          slot.date === selectedSlot.date && slot.hour === selectedSlot.hour
      )
        ? setSubmitValue("Cancel")
        : setSubmitValue("Book"));
  };

  // Submit booking
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (submitValue === "Cancel") {
        const url = `${
          window.location.hostname === "localhost"
            ? "http://localhost:5000/"
            : "https://salty-reaches-24995.herokuapp.com/"
        }cancel`;

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
              handleAlert(
                "You are unauthorised to cancel the slot. Please contact the website's administrator",
                "error"
              );
            } else if (response.status === 403) {
              handleAlert(
                "Unable to cancel slot because it is within the 2 hour cancellation window.",
                "error"
              );
            } else if (response.status === 404) {
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
              handleAlert("Your slot has been cancelled.", "success");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const url = `${
          window.location.hostname === "localhost"
            ? "http://localhost:5000/"
            : "https://salty-reaches-24995.herokuapp.com/"
        }book`;

        fetch(url, {
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
              handleAlert("Your slot has been booked!", "success");
            } else {
              handleAlert("Slot has been fully booked.", "error");
            }
            setSelectedSlot({});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [submitValue, handleAlert, facility.name, selectedSlot]
  );

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
      body: JSON.stringify({
        facility: facility.name,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setBookedSlots(res))
      .catch((err) => console.log(err));
  }, [handleSubmit, facility.name]);

  const slotContainers = [];
  for (let i = 0; i < 3; i++) {
    slotContainers[i] = (
      <SlotContainer
        key={date.addDays(i).toDateString()}
        facility={facility.name}
        date={date.addDays(i).toDateString()}
        hours={
          (day + i) % 7 === 0 || (day + i) % 7 === 6
            ? facility.weekendHours
            : facility.weekdayHours
        }
        handleChange={handleSlotChange}
        selectedSlot={selectedSlot}
        bookedSlots={bookedSlots}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">Book a Facility</Typography>
      <Box className={classes.box}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="facility-label">Select Facility</InputLabel>
          <Select
            labelId="facility-label"
            id="facility"
            onChange={handleFacilityChange}
            label="Select Facility"
          >
            <MenuItem value={0}>{facilities[0].name}</MenuItem>
            <MenuItem value={1}>{facilities[1].name}</MenuItem>
            <MenuItem value={2}>{facilities[2].name}</MenuItem>
            <MenuItem value={3}>{facilities[3].name}</MenuItem>
            <MenuItem value={4}>{facilities[4].name}</MenuItem>
            <MenuItem value={5}>{facilities[5].name}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <form onSubmit={handleSubmit}>
        {slotContainers}
        {Object.keys(selectedSlot).length !== 0 && (
          <Box display="flex" justifyContent="center">
            <input type="submit" value={submitValue} className={classes.button}/>
          </Box>
        )}
      </form>
    </div>
  );
};

export default Booking;
