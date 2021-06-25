import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  title: {
    fontWeight: "600",
  },
}));

const appointments = [
  {
    title: "CS2103T",
    startDate: new Date(2021, 5, 22, 12),
    endDate: new Date(2021, 5, 22, 14),
    rRule: "FREQ=WEEKLY",
    lessonType: "LEC [G04]",
    location: "E-Learning",
  },
];

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

const Timetable = () => {
  return (
    <Paper>
      <Scheduler data={appointments}>
        <WeekView startDayHour={7} endDayHour={22} cellDuration={60} />
        <Appointments appointmentContentComponent={AppointmentContent} />
      </Scheduler>
    </Paper>
  );
};

export default Timetable;
