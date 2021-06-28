import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { addHours } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #EF7C00",
    margin: theme.spacing(0.5),
  },
  slot: {
    display: "none",
    "&[disabled] ~ label": {
      color: "rgb(170, 170, 170)",
    },
    "&[booked='true'] ~ label": {
      backgroundColor: "forestgreen",
    },
    "&[booked='true']:checked ~ label": {
      backgroundColor: "#ef7c00",
    },
    "&:checked ~ label": {
      backgroundColor: "#ef7c00",
    },
  },
  slotLabel: {
    display: "inline-block",
    boxSizing: "border-box",
    margin: 0,
    padding: "5px 20px",
    width: "100%",
    cursor: "pointer",
  },
}));

const Slot = ({ facility, date, handleChange, checked, booked }) => {
  const classes = useStyles();
  const [slotsLeft, setSlotsLeft] = useState(20);
  const slotsCap = 20; // TODO: different across facilities

  useEffect(() => {
    const url = `${
      window.location.hostname === "localhost"
        ? "http://localhost:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }slots`;

    const fetchSlotsCount = async () => {
      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facility,
          date,
        }),
        credentials: "include",
      });
      const slotsCount = await res.json();
      setSlotsLeft(slotsCap - slotsCount);
    };
    fetchSlotsCount();
  }, [checked]);

  // Disable current day slots whose time has elapsed
  const slotTime = addHours(date, 1); // + 1 since the slot can still be booked in the 1h gap
  const hour = date
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", "");
  const currentTime = new Date().getTime();

  return (
    <div className={classes.root}>
      <input
        type="checkbox"
        className={classes.slot}
        id={date}
        date={date}
        onChange={handleChange}
        checked={checked}
        disabled={slotsLeft <= 0 || slotTime <= currentTime}
        booked={booked.toString()}
      />
      <label className={classes.slotLabel} htmlFor={date}>
        <strong>{hour}</strong>
      </label>
      <label
        className={classes.slotLabel}
        htmlFor={date}
      >{`${slotsLeft} Left`}</label>
    </div>
  );
};

export default Slot;
