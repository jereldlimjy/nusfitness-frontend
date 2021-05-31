import Slot from "./Slot";

const SlotContainer = ({ date, hours }) => {
  return (
    <div className="card all-center">
      <h2 className="lead">{date}</h2>

      {hours.map((hourObject) => (
        <Slot
          date={date}
          hour={hourObject.active && hourObject.time}
          slotsLeft={hourObject.slotsLeft}
        />
      ))}
    </div>
  );
};

export default SlotContainer;
