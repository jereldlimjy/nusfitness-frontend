import { useState } from "react";
import SlotContainer from "./SlotContainer";

const Booking = ({ handleAlert }) => {
  // Weekday and weekend slots for all facilities
  const facilities = [
    {
      name: "Kent Ridge Swimming Pool",
      weekdayHours: [
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
      weekendHours: [
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
    {
      name: "University Town Swimming Pool",
      weekdayHours: [
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
      weekendHours: [
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
    {
      name: "Kent Ridge Gym",
      weekdayHours: [
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
      weekendHours: [],
    },
    {
      name: "University Sports Centre Gym",
      weekdayHours: [
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
      weekendHours: [
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
    {
      name: "University Town Gym",
      weekdayHours: [
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
      weekendHours: [
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
    {
      name: "Wellness Outreach Gym",
      weekdayHours: [
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
      weekendHours: [],
    },
  ];

  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [selectedSlot, setSelectedSlot] = useState({
    date: null,
    hour: null,
  });

  // Get current date and day
  const date = new Date();
  const day = date.getDay();

  // addDays function
  Date.prototype.addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  // Changing facility
  const handleFacilityChange = (e) => {
    setSelectedFacility(facilities[e.target.value]);
    setSelectedSlot({ date: null, hour: null });
  };

  // Changing a slot
  const handleSlotChange = (e) => {
    const checkbox = e.target;

    if (checkbox.checked) {
      setSelectedSlot({
        date: checkbox.attributes.date.value,
        hour: checkbox.attributes.hour.value,
      });
    } else {
      setSelectedSlot({ date: null, hour: null });
    }
  };

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSlot.date !== null) {
      const url = `${
        window.location.hostname === "localhost"
          ? "http://localhost:3000/"
          : "https://salty-reaches-24995.herokuapp.com/"
      }book`;

      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facility: selectedFacility.name,
          ...selectedSlot,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            handleAlert("Your slot has been booked!", "success");
            setSelectedSlot({ date: null, hour: null });
          }
        })
        .catch((err) => {
          handleAlert("Failed to book, please try another slot :(", "danger");
          setSelectedSlot({ date: null, hour: null });
        });
    } else {
      handleAlert("Please select a slot", "danger");
    }
  };

  return (
    <div>
      <label htmlFor="facility">Select facility:</label>
      <select name="facility" id="facility" onChange={handleFacilityChange}>
        <option value={0}>{facilities[0].name}</option>
        <option value={1}>{facilities[1].name}</option>
        <option value={2}>{facilities[2].name}</option>
        <option value={3}>{facilities[3].name}</option>
        <option value={4}>{facilities[4].name}</option>
        <option value={5}>{facilities[5].name}</option>
      </select>

      <form onSubmit={handleSubmit} className="container-vert">
        <SlotContainer
          facility={selectedFacility.name}
          date={date.toDateString()}
          hours={
            day === 0 || day === 6
              ? selectedFacility.weekendHours
              : selectedFacility.weekdayHours
          }
          handleChange={handleSlotChange}
          selectedSlot={selectedSlot}
        />
        <SlotContainer
          facility={selectedFacility.name}
          date={date.addDays(1).toDateString()}
          hours={
            (day + 1) % 7 === 0 || (day + 1) % 7 === 6
              ? selectedFacility.weekendHours
              : selectedFacility.weekdayHours
          }
          handleChange={handleSlotChange}
          selectedSlot={selectedSlot}
        />
        <SlotContainer
          facility={selectedFacility.name}
          date={date.addDays(2).toDateString()}
          hours={
            (day + 2) % 7 === 0 || (day + 2) % 7 === 6
              ? selectedFacility.weekendHours
              : selectedFacility.weekdayHours
          }
          handleChange={handleSlotChange}
          selectedSlot={selectedSlot}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Booking;
