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
  // To simulate time data
  const setTime = (h, m) => {
    const date = new Date();
    date.setHours(h, m);
    return date;
  };

  const data = [
    { date: setTime(7, 30), count: 20 },
    { date: setTime(7, 35), count: 20 },
    { date: setTime(7, 40), count: 20 },
    { date: setTime(7, 45), count: 20 },
    { date: setTime(7, 50), count: 20 },
    { date: setTime(7, 55), count: 20 },
    { date: setTime(8, 0), count: 25 },
    { date: setTime(8, 30), count: 27 },
    { date: setTime(9, 0), count: 23 },
    { date: setTime(9, 30), count: 17 },
    { date: setTime(10, 0), count: 12 },
    { date: setTime(10, 30), count: 5 },
    { date: setTime(11, 0), count: 4 },
    { date: setTime(11, 30), count: 7 },
    { date: setTime(12, 0), count: 10 },
    { date: setTime(12, 30), count: 25 },
    { date: setTime(13, 0), count: 39 },
  ];
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
      date: { $lte: new Date(2021, 5, 15, 22) },
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));

  return (
    <div className="container">
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
        // padding={{ left: 70, right: 10, top: 10, bottom: 10 }}
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
