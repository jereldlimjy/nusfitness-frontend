import Slot from "./Slot";

const SlotContainer = ({
  facility,
  date,
  hours,
  handleChange,
  selectedSlot,
  bookedSlots,
}) => {
  return (
    <div className="card all-center">
      <h2 className="lead">{date}</h2>
      {hours.map((hour) => (
        <Slot
          key={hour + date}
          facility={facility}
          date={date}
          hour={hour}
          handleChange={handleChange}
          checked={
            selectedSlot &&
            selectedSlot.date === date &&
            selectedSlot.hour === hour
          }
          disabled={
            bookedSlots.filter(
              (slot) => slot.date === date && slot.hour === hour
            ).length > 0
          }
        />
      ))}
    </div>
  );
};

export default SlotContainer;
