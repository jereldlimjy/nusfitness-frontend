import {
  Scheduler,
  WeekView,
  Appointments,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import qs from "query-string";
import { castArray, invert, mapValues } from "lodash";
import addDays from "date-fns/addDays";
import { useEffect, useState } from "react";
import nusmoderator from "nusmoderator";
import { addHours, addMinutes } from "date-fns";

const LESSON_SEP = ",";
const LESSON_TYPE_SEP = ":";
const LESSON_TYPE_ABBREV = {
  "Design Lecture": "DLEC",
  Laboratory: "LAB",
  Lecture: "LEC",
  "Packaged Lecture": "PLEC",
  "Packaged Tutorial": "PTUT",
  Recitation: "REC",
  "Sectional Teaching": "SEC",
  "Seminar-Style Module Class": "SEM",
  Tutorial: "TUT",
  "Tutorial Type 2": "TUT2",
  "Tutorial Type 3": "TUT3",
  Workshop: "WS",
};
const LESSON_ABBREV_TYPE = invert(LESSON_TYPE_ABBREV);
const DAY_OF_WEEK = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  title: {
    fontWeight: "600",
  },
  timeTableCell: {
    height: "66px",
  },
  timeLabel: {
    height: "66px",
    lineHeight: "64px",
    "&:first-child": {
      height: "33px",
    },
    "&:last-child": {
      height: "33px",
    },
  },
  inputContainer: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  inputFields: {
    marginRight: theme.spacing(2),
  },
  select: {
    minWidth: 200,
    marginRight: theme.spacing(2),
  },
}));

const AppointmentComponent = ({ style, ...restProps }) => {
  const backgroundColor = restProps.data.isLesson ? blue[400] : red[400];
  return (
    <Appointments.Appointment
      {...restProps}
      style={{ ...style, backgroundColor }}
    />
  );
};

// Format for appointment content
const AppointmentContent = ({ data, ...restProps }) => {
  const classes = useStyles();
  return (
    <Appointments.AppointmentContent {...restProps} data={data}>
      <div className={classes.container}>
        <div className={classes.title}>{data.title}</div>
        <div>{data.lessonType}</div>
        <div>{data.location}</div>
      </div>
    </Appointments.AppointmentContent>
  );
};

const TimeTableCell = (props) => {
  const classes = useStyles();
  return (
    <WeekView.TimeTableCell {...props} className={classes.timeTableCell} />
  );
};

const TimeLabel = (props) => {
  const classes = useStyles();
  return (
    <WeekView.TimeScaleLabel
      {...props}
      formatDate={(date) =>
        date
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(":", "")
      }
      className={classes.timeLabel}
    />
  );
};

const TickCell = (props) => {
  const classes = useStyles();
  return (
    <WeekView.TimeScaleTickCell {...props} className={classes.timeTableCell} />
  );
};

const Timetable = ({ bookedSlots }) => {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showLessons, setShowLessons] = useState(true);
  const [firstDayOfWeek, SetFirstDayOfWeek] = useState(0);
  const [timeTableLink, setTimeTableLink] = useState(
    "https://nusmods.com/timetable/sem-1/share?CS2040S=LAB:03,LEC:1,TUT:05&CS2100=LAB:13,TUT:16,LEC:1&CS2101=&CS2103T=LEC:G03&ST2334=LEC:1"
  );
  const [linkError, setLinkError] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();

  const retrieveSemester = () => {
    const match = timeTableLink.match(/sem-\d/);
    if (!match) {
      setLinkError(true);
    } else {
      const semester = parseInt(match[0].slice(4, 5));
      if (semester === 1 || semester === 2) {
        setLinkError(false);
        return semester;
      } else {
        setLinkError(true);
      }
    }
  };

  // Deserialize timetable to an object, where keys are modules and values are objects of lessons
  const deserializeTimetable = () => {
    const serialized = timeTableLink.match(/\?\S*/);
    if (!serialized) {
      setLinkError(true);
    } else {
      setLinkError(false);
      const params = qs.parse(serialized[0]);
      return mapValues(params, parseModuleConfig);
    }
  };

  // Parsing timetable object where values are strings to values of objects
  const parseModuleConfig = (serialized) => {
    const config = {};
    if (!serialized) return config;

    castArray(serialized).forEach((serializedModule) => {
      serializedModule.split(LESSON_SEP).forEach((lesson) => {
        const [lessonTypeAbbr, classNo] = lesson.split(LESSON_TYPE_SEP);
        const lessonType = LESSON_ABBREV_TYPE[lessonTypeAbbr];
        // Ignore unparsable/invalid keys
        if (!lessonType) return;
        config[lessonType] = classNo;
      });
    });

    return config;
  };

  // Get the Sunday of the current week
  const getSunday = (date) => {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const setTimetable = async (semester, timetable) => {
    const sunday = getSunday(new Date());
    let allLessons = [];

    // Loop through each module in the timetable
    for (const [moduleName, moduleLessons] of Object.entries(timetable)) {
      await fetch(
        `https://api.nusmods.com/v2/2021-2022/modules/${moduleName}.json`,
        {
          method: "get",
        }
      )
        .then((res) => res.json())
        .then((moduleData) => {
          // Retrieve this semester's module data
          const [currentSemesterData] = moduleData.semesterData.filter(
            (semesterData) => semesterData.semester === semester
          );

          // Filter lessons for the module which matches the timetable
          let filteredLessons = Object.keys(moduleLessons).flatMap(
            (lessonType) =>
              currentSemesterData.timetable.filter(
                (lesson) =>
                  lesson.classNo === moduleLessons[lessonType] &&
                  lesson.lessonType === lessonType
              )
          );

          // If alwaysShowLessons is false, hide lessons which are not available for the current week
          if (!showLessons) {
            const acadWeekInfo = nusmoderator.academicCalendar.getAcadWeekInfo(
              new Date()
            );
            const currentSem = acadWeekInfo.sem;
            const currentWeek = acadWeekInfo.num;
            filteredLessons = filteredLessons.filter(
              (lesson) =>
                currentSem === semester && lesson.weeks.includes(currentWeek)
            );
          }

          // Create an array of appointments based on the module
          const lessons = filteredLessons.map((lesson) => {
            const title = moduleName;

            // Retrieve start and end times
            const startHour = parseInt(lesson.startTime.slice(0, 2));
            const startMinute = parseInt(lesson.startTime.slice(2, 4));
            const endHour = parseInt(lesson.endTime.slice(0, 2));
            const endMinute = parseInt(lesson.endTime.slice(2, 4));

            // Set start and end dates
            const startDate = addDays(sunday, DAY_OF_WEEK[lesson.day]);
            const endDate = addDays(sunday, DAY_OF_WEEK[lesson.day]);
            startDate.setHours(startHour, startMinute, 0, 0);
            endDate.setHours(endHour, endMinute, 0, 0);

            const lessonType = `${LESSON_TYPE_ABBREV[lesson.lessonType]} [${
              lesson.classNo
            }]`;

            const location = lesson.venue;
            const isLesson = true;
            return {
              title,
              startDate,
              endDate,
              lessonType,
              location,
              isLesson,
            };
          });
          allLessons = allLessons.concat(lessons);
        });
    }
    return allLessons;
  };

  const setBookedSlots = () => {
    bookedSlots = bookedSlots.map((slot) => {
      const title = "Facility Booking";
      const startDate = new Date(slot.date);
      const endDate =
        startDate.getMinutes() === 0
          ? addHours(startDate, 1)
          : addMinutes(addHours(startDate, 1), 30);
      const location = slot.facility;
      const isLesson = false;
      return { title, startDate, endDate, location, isLesson };
    });
    return bookedSlots;
  };

  useEffect(async () => {
    const semester = retrieveSemester();
    if (!semester) {
      return;
    }
    const deserializedTimetable = deserializeTimetable();
    if (!deserializedTimetable) {
      return;
    }
    const lessons = await setTimetable(semester, deserializedTimetable);
    const slots = await setBookedSlots();
    setAppointments([...lessons, ...slots]);
  }, [timeTableLink, showLessons, bookedSlots]);

  const handleShowTimetableChange = () => {
    setShowTimeTable(!showTimeTable);
  };
  const handleShowLessons = () => {
    setShowLessons(!showLessons);
  };
  const handleFirstDayOfWeekChange = (e) => SetFirstDayOfWeek(e.target.value);
  const handleLinkChange = (e) => setTimeTableLink(e.target.value);
  console.log(appointments);
  return (
    <Box className={classes.root}>
      <Box className={classes.inputContainer}>
        <Button
          onClick={handleShowTimetableChange}
          variant="contained"
          color="primary"
          className={classes.inputFields}
        >
          {showTimeTable ? "Hide Timetable" : "Show Timetable"}
        </Button>

        {showTimeTable && (
          <Tooltip
            title={
              showLessons
                ? "Only show lessons which occur during the current academic week"
                : "Show lessons regardless of academic week"
            }
          >
            <Button
              onClick={handleShowLessons}
              variant="contained"
              color="secondary"
              className={classes.inputFields}
            >
              {showLessons ? "Hide Lessons" : "Always Show Lessons"}
            </Button>
          </Tooltip>
        )}

        {showTimeTable && (
          <TextField
            select
            label="First Day of Week"
            variant="outlined"
            className={classes.select}
            onChange={handleFirstDayOfWeekChange}
            value={firstDayOfWeek}
          >
            <MenuItem value={0}>Sunday</MenuItem>
            <MenuItem value={1}>Monday</MenuItem>
          </TextField>
        )}

        {showTimeTable && (
          <TextField
            error={linkError}
            label={linkError ? "Error" : "NUSMods Share Link"}
            helperText={linkError ? "Invalid Link" : ""}
            value={timeTableLink}
            variant="outlined"
            onChange={handleLinkChange}
            className={classes.inputFields}
          />
        )}
      </Box>

      {showTimeTable && (
        <Paper>
          <Scheduler firstDayOfWeek={firstDayOfWeek} data={appointments}>
            <WeekView
              startDayHour={7}
              endDayHour={22}
              cellDuration={60}
              timeTableCellComponent={TimeTableCell}
              timeScaleLabelComponent={TimeLabel}
              timeScaleTickCellComponent={TickCell}
            />
            <Appointments
              appointmentComponent={AppointmentComponent}
              appointmentContentComponent={AppointmentContent}
            />
            <CurrentTimeIndicator />
          </Scheduler>
        </Paper>
      )}
    </Box>
  );
};

export default Timetable;
