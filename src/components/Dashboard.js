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
  const [fetchedData, setFetchedData] = useState([]);
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
        date: { $gte: startDate, $lte: endDate },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFetchedData(
          res.map((e) => {
            const date = new Date(e.date);
            return {
              date: setTime(date.getHours(), date.getMinutes()),
              countArray: e.traffic,
            };
          })
        );
      });
  }, [selectedDates]);

  // Set facility traffic
  useEffect(() => {
    const facilityTraffic = fetchedData.map((e) => ({
      date: e.date,
      count: e.countArray[facilities.indexOf(facility)],
    }));

    // Group by date function
    function groupByDate(traffic) {
      return traffic.reduce((arr, obj) => {
        const date = obj.date;
        let matchedObj = arr.find((e) => e.date.getTime() === date.getTime());
        if (matchedObj) {
          matchedObj.countArray.push(obj.count);
        } else {
          arr.push({ date, countArray: [obj.count] });
        }
        return arr;
      }, []);
    }

    // Aggregate counts across dates
    const groupedArray = groupByDate(facilityTraffic);
    const aggregatedArray = groupedArray.map((e) => {
      const countArray = e.countArray;
      const sum = countArray.reduce((a, b) => a + b, 0);
      const avg = sum / countArray.length;
      const rounded = Math.round(avg * 10) / 10;
      return { date: e.date, count: rounded };
    });

    setData(aggregatedArray);
  }, [fetchedData, facility]);

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
