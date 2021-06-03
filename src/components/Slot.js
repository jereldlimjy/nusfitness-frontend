const Slot = ({ date, hour, handleChange }) => {
  return (
    <div className="border-box">
      <input
        type="checkbox"
        id={hour + date}
        name={hour}
        onChange={handleChange}
      />
      <label for={hour + date}>{hour}</label>
      <label for={hour + date}>{`40 Left`}</label>
    </div>
    // TODO: query slotsLeft from db
  );
};

export default Slot;
