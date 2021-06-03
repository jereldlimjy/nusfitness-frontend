import { useState } from "react";
import SlotContainer from "./SlotContainer";

const Booking = () => {
  // Weekday and weekend slots for all facilities
  const facilityHours = {
    poolKr: {
      weekday: [
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
      weekend: [
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
    },

    poolUtown: {
      weekday: [
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
      weekend: [
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
    },

    gymKr: {
      weekday: [
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
      weekend: [],
    },

    gymUsc: {
      weekday: [
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
      weekend: [
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
    },

    gymUtown: {
      weekday: [
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
      weekend: [
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
    },

    gymWellness: {
      weekday: [
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
      weekend: [],
    },
  };

  const [selectedHours, setSelectedHours] = useState(facilityHours.poolUtown);

  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSlotChange = (e) => {
    // console.log(e);
    // name, facility, timeBooked, date
    // this.setSelectedSlots([...selectedSlots, ])
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
  };

  const handleFacilityChange = (e) => {
    setSelectedHours(Object.entries(facilityHours)[e.target.value][1]);
  };

  // Get current date and day
  const date = new Date();
  const day = date.getDay();

  // addDays function
  Date.prototype.addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
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
          date={date}
          hours={
            day == 0 || day == 6 ? selectedHours.weekend : selectedHours.weekday
          }
          handleChange={handleSlotChange}
        />
        <SlotContainer
          date={date.addDays(1)}
          hours={
            (day + 1) % 7 == 0 || (day + 1) % 7 == 6
              ? selectedHours.weekend
              : selectedHours.weekday
          }
        />
        <SlotContainer
          date={date.addDays(2)}
          hours={
            (day + 2) % 7 == 0 || (day + 2) % 7 == 6
              ? selectedHours.weekend
              : selectedHours.weekday
          }
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Booking;
