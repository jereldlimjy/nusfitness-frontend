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
  const [selectedSlot, setSelectedSlot] = useState({});
  const [bookedSlots, setBookedSlots] = useState([]);
  const [submitValue, setSubmitValue] = useState("Book");

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
    setSelectedSlot({});
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
      setSelectedSlot({});
    }

    // Update submit value
    const selectedSlot = {
      date: checkbox.attributes.date.value,
      hour: checkbox.attributes.hour.value,
    };
    Object.keys(selectedSlot).length !== 0 &&
      (bookedSlots.find(
        (slot) =>
          slot.date === selectedSlot.date && slot.hour === selectedSlot.hour
      )
        ? setSubmitValue("Cancel")
        : setSubmitValue("Book"));
  };

  // Submit booking
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (submitValue === "Cancel") {
        const url = `${
          window.location.hostname === "localhost"
            ? "http://localhost:3000/"
            : "https://salty-reaches-24995.herokuapp.com/"
        }cancel`;

        fetch(url, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facility: facility.name,
            ...selectedSlot,
          }),
          credentials: "include",
        })
          .then((response) => {
            if (response.status === 401) {
              handleAlert(
                "You are unauthorised to cancel the slot. Please contact the website's administrator",
                "danger"
              );
            } else if (response.status === 403) {
              handleAlert(
                "Unable to cancel slot because it is within the 2 hour cancellation window.",
                "danger"
              );
            } else if (response.status === 404) {
              handleAlert(
                "Slot cannot be found. Please contact the website's administrator",
                "danger"
              );
            }
            setSelectedSlot({});
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              handleAlert("Your slot has been cancelled.", "success");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
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
            } else {
              handleAlert("Slot has been fully booked.", "danger");
            }
            setSelectedSlot({});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [submitValue, handleAlert, facility.name, selectedSlot]
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
  }, [handleSubmit, facility.name]);

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
        {Object.keys(selectedSlot).length !== 0 && (
          <input type="submit" value={submitValue} />
        )}
      </form>
    </div>
  );
};

export default Booking;
