import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #EF7C00",
    borderRadius: 5,
    margin: theme.spacing(0.5),
  },
  slot: {
    display: "none",
    "&[disabled] ~ label": {
      color: "rgb(170, 170, 170)"
    },
    "&[booked='true'] ~ label": {
      backgroundColor: '#06c258',
    },
    "&[booked='true']:checked ~ label": {
      backgroundColor: "#ef7c00"
    },
    "&:checked ~ label": {
      backgroundColor: "#ef7c00"
    }
  },
  slotLabel: {
    display: "inline-block",
    boxSizing: "border-box",
    margin: 0,
    padding: "5px 20px",
    width: "100%",
    cursor: "pointer"
  }
}));

const Slot = ({ facility, date, hour, handleChange, checked, booked }) => {
  const classes = useStyles();
  const [slotsLeft, setSlotsLeft] = useState(0);
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
          hour,
        }),
        credentials: "include",
      });
      const slotsCount = await res.json();
      setSlotsLeft(slotsCap - slotsCount);
    };
    fetchSlotsCount();
  });

  // Disable current day slots whose time has elapsed
  const hourInt = parseInt(hour.slice(0, 2));
  const slotTime = new Date(date).setHours(hourInt + 1); // + 1 since the slot can still be booked in the 1h gap
  const currentTime = new Date().getTime();

  return (
    <div className={classes.root}>
      <input
        type="checkbox"
        className={classes.slot}
        id={hour + date}
        date={date}
        hour={hour}
        onChange={handleChange}
        checked={checked}
        disabled={slotsLeft <= 0 || slotTime <= currentTime}
        booked={booked.toString()}
      />
      <label className={classes.slotLabel} htmlFor={hour + date}>
        <strong>{hour}</strong>
      </label>
      <label
        className={classes.slotLabel}
        htmlFor={hour + date}
      >{`${slotsLeft} Left`}</label>
    </div>
  );
};

export default Slot;
