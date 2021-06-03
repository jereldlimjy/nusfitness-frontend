import { useState } from "react";
import SlotContainer from "./SlotContainer";

const Booking = () => {
  const facilityHours = {
    poolKrWeekday: [
      "0730",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    poolKrWeekend: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
    poolUtownWeekday: [
      "0730",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    poolUtownWeekend: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
    gymKrWeekday: [
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
    ],
    gymKrWeekend: [],
    gymUscWeekday: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
    ],
    gymUscWeekend: [
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
    ],
    gymUtownWeekday: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
    gymUtownWeekend: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
    gymWellnessWeekday: [
      "0700",
      "0800",
      "0900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
    gymWellnessWeekend: [],
  };

  const dates = ["3 May 2021", "4 May 2021", "5 May 2021"];

  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSlotChange = (e) => {
    console.log(e);
    // name, facility, timeBooked, date
    // this.setSelectedSlots([...selectedSlots, ])
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
  };

  const [selectedHours, setSelectedHours] = useState(
    facilityHours.poolUtownWeekday
  );
  const handleFacilityChange = (e) => {
    // console.log(e.target.value);
    // console.log(Object.entries(facilityHours)[e.target.value * 2][1]);
    setSelectedHours(Object.entries(facilityHours)[e.target.value * 2][1]);
    console.log(selectedHours);
  };

  return (
    <div>
      <label htmlFor="facility">Select facility:</label>
      <select name="facility" id="facility" onChange={handleFacilityChange}>
        <option value={0}>Kent Ridge Swimming Pool</option>
        <option value={1}>University Town Swimming Pool</option>
        <option value={2}>Kent Ridge Gym</option>
        <option value={3}>University Sports Centre Gym</option>
        <option value={4}>University Town Gym</option>
        <option value={5}>Wellness Outreach Gym</option>
      </select>

      <form onSubmit={handleSubmit} className="container-vert">
        <SlotContainer
          date={dates[0]} // TODO: date generated within SlotContainer
          hours={selectedHours}
          handleChange={handleSlotChange}
        />
        <SlotContainer date={dates[1]} hours={selectedHours} />
        <SlotContainer date={dates[2]} hours={selectedHours} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Booking;
