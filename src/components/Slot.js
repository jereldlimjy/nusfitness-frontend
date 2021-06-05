const Slot = ({ date, hour, handleChange, checked }) => {
  return (
    <div className="border-box">
      <input
        type="checkbox"
        id={hour + date}
        date={date}
        hour={hour}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={hour + date}>{hour}</label>
      <label htmlFor={hour + date}>{`40 Left`}</label>
    </div>
    // TODO: query slotsLeft from db
  );
};

export default Slot;
