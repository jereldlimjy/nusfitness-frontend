import Slot from "./Slot";

const SlotContainer = ({
  facility,
  date,
  hours,
  handleChange,
  selectedSlot,
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
          checked={selectedSlot.date === date && selectedSlot.hour === hour}
        />
      ))}
    </div>
  );
};

export default SlotContainer;
