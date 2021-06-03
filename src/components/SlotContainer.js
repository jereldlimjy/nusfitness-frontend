import Slot from "./Slot";

const SlotContainer = ({ date, hours, handleChange }) => {
  return (
    <div className="card all-center">
      <h2 className="lead">{date}</h2>

      {hours.map((hour) => (
        <Slot date={date} hour={hour} handleChange={handleChange} />
      ))}
    </div>
  );
};

export default SlotContainer;
