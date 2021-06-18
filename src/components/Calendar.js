import { DateRangePicker } from "react-date-range";
import { defaultInputRanges } from "react-date-range";

const Calendar = ({ selectedDates, setSelectedDates }) => {
  return (
    <DateRangePicker
      onChange={(item) => setSelectedDates([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      maxDate={new Date()}
      ranges={selectedDates}
      inputRanges={defaultInputRanges.slice(0, 1)}
      direction="horizontal"
    />
  );
};

export default Calendar;
