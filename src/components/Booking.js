import SlotContainer from "./SlotContainer";

const Booking = () => {
  const allFacilitiesHours = {
    poolKrWeekday: [
      { time: "0730", active: true, slotsLeft: 40 },
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
    ],
    poolKrWeekend: [
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
    ],
    poolUtownWeekday: [
      { time: "0730", active: true, slotsLeft: 40 },
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
    ],
    poolUtownWeekend: [
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
    ],
    gymKrWeekday: [
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
    ],
    gymKrWeekend: [],
    gymUscWeekday: [
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
    ],
    gymUscWeekend: [
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
    ],
    gymUtownWeekday: [
      { time: "0700", active: true, slotsLeft: 40 },
      { time: "0800", active: true, slotsLeft: 40 },
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
      { time: "2100", active: true, slotsLeft: 40 },
    ],
    gymUtownWeekend: [
      { time: "0700", active: true, slotsLeft: 40 },
      { time: "0800", active: true, slotsLeft: 40 },
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
      { time: "2100", active: true, slotsLeft: 40 },
    ],
    gymWellnessWeekday: [
      { time: "0700", active: true, slotsLeft: 40 },
      { time: "0800", active: true, slotsLeft: 40 },
      { time: "0900", active: true, slotsLeft: 40 },
      { time: "1000", active: true, slotsLeft: 40 },
      { time: "1100", active: true, slotsLeft: 40 },
      { time: "1200", active: true, slotsLeft: 40 },
      { time: "1300", active: true, slotsLeft: 40 },
      { time: "1400", active: true, slotsLeft: 40 },
      { time: "1500", active: true, slotsLeft: 40 },
      { time: "1600", active: true, slotsLeft: 40 },
      { time: "1700", active: true, slotsLeft: 40 },
      { time: "1800", active: true, slotsLeft: 40 },
      { time: "1900", active: true, slotsLeft: 40 },
      { time: "2000", active: true, slotsLeft: 40 },
      { time: "2100", active: true, slotsLeft: 40 },
    ],
    gymWellnessWeekend: [],
  };

  return (
    <div className="container-vert">
      <SlotContainer
        date="3 May 2021"
        hours={allFacilitiesHours.gymUtownWeekday}
      />
      <SlotContainer
        date="4 May 2021"
        hours={allFacilitiesHours.gymUtownWeekday}
      />
      <SlotContainer
        date="5 May 2021"
        hours={allFacilitiesHours.gymUtownWeekday}
      />
    </div>
  );
};

export default Booking;
