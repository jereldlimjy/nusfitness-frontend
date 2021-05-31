const Slot = ({ date, hour, slotsLeft }) => {
  return (
    <div className="border-box">
      <input type="checkbox" id={hour + date} name={hour} />
      <label for={hour + date}>{hour}</label>
      <label for={hour + date}>{`${slotsLeft} Left`}</label>
    </div>
  );
};

export default Slot;
