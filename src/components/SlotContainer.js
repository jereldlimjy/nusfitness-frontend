import Slot from "./Slot";

const SlotContainer = ({ hours }) => {
  return (
    <div className="card all-center">
      {hours.map((hourObject) => (
        <Slot hour={hourObject.active && hourObject.time} />
      ))}
    </div>
  );
};

export default SlotContainer;
