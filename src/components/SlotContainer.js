import Slot from "./Slot";

const SlotContainer = () => {
  return (
    <div className="card all-center">
      <Slot />
      <Slot />
      <Slot />
    </div>
  );
};

export default SlotContainer;
