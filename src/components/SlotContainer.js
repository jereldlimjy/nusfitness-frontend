import Slot from "./Slot";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  box: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

const SlotContainer = ({
  facility,
  assignedDate,
  hours,
  handleChange,
  selectedSlot,
  bookedSlots,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5">{assignedDate.toDateString()}</Typography>
      <Box className={classes.box}>
        {hours.map((hourString) => {
          const hour = parseInt(hourString.slice(0, 2));
          const minute = parseInt(hourString.slice(2, 4));
          const date = new Date(assignedDate);
          date.setHours(hour, minute, 0, 0);

          return (
            <Slot
              key={date.toLocaleString()}
              facility={facility}
              date={date}
              handleChange={handleChange}
              checked={
                selectedSlot.date &&
                selectedSlot.date.getTime() === date.getTime()
              }
              booked={
                bookedSlots.filter(
                  (slot) => slot.date.getTime() === date.getTime()
                ).length > 0
              }
            />
          );
        })}
      </Box>
    </div>
  );
};

export default SlotContainer;
