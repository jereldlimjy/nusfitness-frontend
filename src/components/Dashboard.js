import { useEffect, useState } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
  VictoryLabel,
  VictoryVoronoiContainer,
} from "victory";

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

  // To simulate time data
  const setTime = (h, m) => {
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  };
  const tickValues = [
    setTime(8, 0),
    setTime(9, 0),
    setTime(10, 0),
    setTime(11, 0),
    setTime(12, 0),
    setTime(13, 0),
    setTime(14, 0),
    setTime(15, 0),
    setTime(16, 0),
    setTime(17, 0),
    setTime(18, 0),
    setTime(19, 0),
    setTime(20, 0),
    setTime(21, 0),
  ];

  // Changing facility
  const handleFacilityChange = (e) => {
    setFacility(facilities[e.target.value]);
  };

  // Fetch filtered data
  useEffect(() => {
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
        date: { $gte: new Date(2021, 5, 16), $lte: new Date(2021, 5, 17) },
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
  }, []);

  // Set facility traffic
  useEffect(() => {
    setData(
      fetchedData.map((e) => ({
        date: e.date,
        count: e.countArray[facilities.indexOf(facility)],
      }))
    );
  }, [fetchedData, facility]);

  console.log(data);
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

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={(obj) =>
              `Time: ${obj.datum.date
                .toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(":", "")}, Count: ${obj.datum.count}`
            }
            radius={25}
          />
        }
        minDomain={{ x: setTime(7, 0), y: 0 }}
        maxDomain={{ x: setTime(22, 0), y: 40 }}
        height={300}
        width={900}
      >
        <VictoryAxis
          label="Time"
          tickValues={tickValues}
          tickFormat={(date) => {
            return new Date(date)
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(":", "");
          }}
          axisLabelComponent={<VictoryLabel dy={30} />}
        />
        <VictoryAxis
          dependentAxis
          label={"Capacity"}
          axisLabelComponent={<VictoryLabel dy={-30} />}
        />
        <VictoryLine
          data={data}
          x="date"
          y="count"
          scale={{ x: "time", y: "linear" }}
        ></VictoryLine>
      </VictoryChart>
    </div>
  );
};
export default Dashboard;
