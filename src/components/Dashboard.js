import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { blueGrey, lightBlue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css fileimport { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& .MuiCheckbox-colorPrimary.Mui-checked": {
      color: "rgb(61, 145, 255)",
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  selectButton: {
    backgroundColor: "rgb(61, 145, 255)",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const facilities = [
    "Kent Ridge Swimming Pool",
    "University Town Swimming Pool",
    "Kent Ridge Gym",
    "University Sports Centre Gym",
    "University Town Gym",
    "Wellness Outreach Gym",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayGroup = ["SELECT ALL", "REMOVE ALL", "WEEKDAYS", "WEEKENDS"];

  // Set time of current date
  const setTime = (h, m) => {
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  };

  const [facility, setFacility] = useState(facilities[0]);
  const [data, setData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: setTime(0, 0),
      endDate: setTime(0, 0),
      key: "selection",
    },
  ]);
  const [dayOfWeek, setDayOfWeek] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [chartTitle, setChartTitle] = useState("");

  // Changing facility
  const handleFacilityChange = (e) => {
    setFacility(e.target.value);
  };

  // Changing days
  const handleDayChange = (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      setDayOfWeek([...dayOfWeek, parseInt(checkbox.value)]);
    } else {
      setDayOfWeek(dayOfWeek.filter((i) => i !== parseInt(checkbox.value)));
    }
  };

  // Changing day group
  const handleDayGroupChange = (e) => {
    const value = e.target.innerText;

    switch (value) {
      case "SELECT ALL":
        setDayOfWeek([1, 2, 3, 4, 5, 6, 7]);
        break;
      case "REMOVE ALL":
        setDayOfWeek([]);
        break;
      case "WEEKDAYS":
        setDayOfWeek([2, 3, 4, 5, 6]);
        break;
      case "WEEKENDS":
        setDayOfWeek([1, 7]);
        break;
      default:
        break;
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    const [dateRange] = selectedDates;
    const startDate = dateRange.startDate;
    const endDate = addDays(dateRange.endDate, 1); // endDate is 00:00 of end date

    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }traffic`;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facility: facilities.indexOf(facility),
        date: { $gte: startDate, $lte: endDate },
        day: dayOfWeek,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) =>
        setData(
          res.map((e) => ({
            date: new Date(e.date),
            count: e.count,
          }))
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility, selectedDates, dayOfWeek]);

  useEffect(() => {
    // console.log(facility);
    // console.log(selectedDates);
    // console.log(selectedDates[0].startDate.toDateString());
    setChartTitle(
      `${facility}\n${selectedDates[0].startDate.toDateString()} to ${selectedDates[0].endDate.toDateString()} `
    );
  }, [facility, selectedDates, dayOfWeek]);

  return (
    <Box display="flex" className={classes.root}>
      <Box
        display="flex"
        flex="1 1 0"
        flexDirection="column"
        maxWidth="370px"
        className={classes.root}
      >
        <Typography variant="h4">Filters</Typography>
        <Box width="100%" mt={2} mb={2}>
          <Typography variant="h6">Facility</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="facility-label">Select Facility</InputLabel>
            <Select
              value={facility}
              labelId="facility-label"
              id="facility"
              onChange={handleFacilityChange}
              label="Select Facility"
            >
              {facilities.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mt={1}>
          <Typography variant="h6">Date Range</Typography>
          <Calendar
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </Box>

        <FormControl>
          <Typography variant="h6">Days of week</Typography>
          <FormGroup row={true}>
            {days.map((e, i) => (
              <FormControlLabel
                control={
                  <Checkbox
                    key={e + e}
                    value={i + 1}
                    checked={dayOfWeek.includes(i + 1)}
                    onChange={handleDayChange}
                    id={e}
                    color="primary"
                  />
                }
                label={e}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Grid container spacing={1} justify="flex-start">
          {dayGroup.map((e) => (
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={handleDayGroupChange}
                className={classes.selectButton}
              >
                {e}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box flex="3 0 0">
        <Chart setTime={setTime} data={data} />
      </Box>
    </Box>
  );
};
export default Dashboard;
