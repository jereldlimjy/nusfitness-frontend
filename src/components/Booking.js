import { useState, useEffect, useCallback } from "react";
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

  const [facility, setfacility] = useState(facilities[0]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [bookedSlots, setBookedSlots] = useState([]);

  // Date object
  const date = new Date();
  const day = date.getDay();
  Date.prototype.addDays = (days) => {
    /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  // Changing facility
  const handleFacilityChange = (e) => {
    setfacility(facilities[e.target.value]);
    setSelectedSlot();
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
      setSelectedSlot();
    }
  };

  // Submit booking
  const handleSubmit = useCallback(
    (e) => {
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
            facility: facility.name,
            ...selectedSlot,
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              handleAlert("Your slot has been booked!", "success");
              setSelectedSlot();
            }
          })
          .catch((err) => {
            handleAlert("Failed to book, please try another slot :(", "danger");
            setSelectedSlot();
          });
      } else {
        handleAlert("Please select a slot", "danger");
      }
    },
    [handleAlert, facility.name, selectedSlot]
  );

  // Retrieve booked slots
  useEffect(() => {
    const url = `${
      window.location.hostname === "localhost"
        ? "http://localhost:3000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }bookedSlots`;
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facility: facility.name,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setBookedSlots(res))
      .catch((err) => console.log(err));
  }, [handleSubmit]);

  const slotContainers = [];
  for (let i = 0; i < 3; i++) {
    slotContainers[i] = (
      <SlotContainer
        key={date.addDays(i).toDateString()}
        facility={facility.name}
        date={date.addDays(i).toDateString()}
        hours={
          (day + i) % 7 === 0 || (day + i) % 7 === 6
            ? facility.weekendHours
            : facility.weekdayHours
        }
        handleChange={handleSlotChange}
        selectedSlot={selectedSlot}
        bookedSlots={bookedSlots}
      />
    );
  }

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
        {slotContainers}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Booking;
