import { DateRange } from "react-date-range";

const Calendar = ({ selectedDates, setSelectedDates }) => {
  return (
    <DateRange
      onChange={(item) => setSelectedDates([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      maxDate={new Date()}
      ranges={selectedDates}
      direction="horizontal"
    />
  );
};

export default Calendar;
