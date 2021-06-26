import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css fileimport { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import Calendar from "./Calendar";
import Chart from "./Chart";

const Dashboard = () => {
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
    const value = e.target.value;

    switch (value) {
      case "Select All":
        setDayOfWeek([1, 2, 3, 4, 5, 6, 7]);
        break;
      case "Remove All":
        setDayOfWeek([]);
        break;
      case "Weekdays Only":
        setDayOfWeek([2, 3, 4, 5, 6]);
        break;
      case "Weekends Only":
        setDayOfWeek([1, 7]);
        break;
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    const [dateRange] = selectedDates;
    const startDate = dateRange.startDate;
    const endDate = addDays(dateRange.endDate, 1); // endDate is 00:00 of end date

    const url = `${
      window.location.hostname === "localhost"
        ? "http://localhost:5000/"
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
  }, [facility, selectedDates, dayOfWeek]);

  return (
    <div className="container">
      <label htmlFor="facility">Select facility:</label>
      <select
        name="facility"
        id="facility"
        selected={facility}
        onChange={handleFacilityChange}
      >
        {facilities.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <div>
        <div>
          <input
            type="button"
            value="Select All"
            onClick={handleDayGroupChange}
          />
          <input
            type="button"
            value="Remove All"
            onClick={handleDayGroupChange}
          />
          <input
            type="button"
            value="Weekdays Only"
            onClick={handleDayGroupChange}
          />
          <input
            type="button"
            value="Weekends Only"
            onClick={handleDayGroupChange}
          />
        </div>
        <div>
          {days.map((e, i) => (
            <React.Fragment key={e}>
              <input
                key={e + e}
                type="checkbox"
                id={e}
                value={i + 1}
                checked={dayOfWeek.includes(i + 1)}
                onChange={handleDayChange}
              />
              <label key={e + e + e} htmlFor={e}>
                {e}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Calendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />

      <Chart setTime={setTime} data={data} />
    </div>
  );
};
export default Dashboard;
