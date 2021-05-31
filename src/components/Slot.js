const Slot = ({ hour, slotsLeft }) => {
  return (
    <div className="card all-center">
      <button className="btn">{hour}</button>
      <i>{`Slots left: ${slotsLeft}`}</i>
    </div>
  );
};

export default Slot;
