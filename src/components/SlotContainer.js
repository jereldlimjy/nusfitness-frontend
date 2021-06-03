import Slot from "./Slot";

const SlotContainer = ({ date, hours, handleChange }) => {
  return (
    <div className="card all-center">
      <h2 className="lead">{date.toDateString()}</h2>
      {hours.map((hour) => (
        <Slot
          key={hour + date}
          date={date.toDateString()}
          hour={hour}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default SlotContainer;
