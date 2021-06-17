import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css fileimport { useEffect, useState } from "react";
import { useState, useEffect } from "react";
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
  const [facility, setFacility] = useState(facilities[0]);
  const [data, setData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // To simulate time data
  const setTime = (h, m) => {
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  };

  // Changing facility
  const handleFacilityChange = (e) => {
    setFacility(facilities[e.target.value]);
  };

  // Fetch filtered data
  useEffect(() => {
    // Retrieve filtered dates
    const [dateRange] = selectedDates;
    const startDate = dateRange.startDate;
    const endDate = addDays(dateRange.endDate, 1);

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
  }, [selectedDates, facility]);

  return (
    <div className="container">
      <label htmlFor="facility">Select facility:</label>
      <select name="facility" id="facility" onChange={handleFacilityChange}>
        <option value={0}>{facilities[0]}</option>
        <option value={1}>{facilities[1]}</option>
        <option value={2}>{facilities[2]}</option>
        <option value={3}>{facilities[3]}</option>
        <option value={4}>{facilities[4]}</option>
        <option value={5}>{facilities[5]}</option>
      </select>

      <Calendar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />

      <Chart setTime={setTime} data={data} />
    </div>
  );
};
export default Dashboard;
