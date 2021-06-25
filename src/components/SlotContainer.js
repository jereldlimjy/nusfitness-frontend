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
    flexWrap: "wrap"
  }
}));

const SlotContainer = ({
  facility,
  date,
  hours,
  handleChange,
  selectedSlot,
  bookedSlots,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5">{date}</Typography>
      <Box className={classes.box}>
        {hours.map((hour) => (
          <Slot
            key={hour + date}
            facility={facility}
            date={date}
            hour={hour}
            handleChange={handleChange}
            checked={selectedSlot.date === date && selectedSlot.hour === hour}
            booked={
              bookedSlots.filter(
                (slot) => slot.date === date && slot.hour === hour
              ).length > 0
            }
          />
        ))}
      </Box>
    </div>
  );
};

export default SlotContainer;
