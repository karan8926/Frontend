import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Available Slot",
    start: moment("2024-12-05T09:00:00").toDate(),
    end: moment("2024-12-05T09:30:00").toDate(),
    resource: "1",
  },
  {
    title: "Available Slot",
    start: moment("2024-12-05T10:00:00").toDate(),
    end: moment("2024-12-06T10:30:00").toDate(),
    resource: "2",
  },
  {
    title: "Available Slot",
    start: moment("2024-12-06T11:00:00").toDate(),
    end: moment("2024-12-06T11:30:00").toDate(),
    resource: "3",
  },
  {
    title: "Available Slot",
    start: moment("2024-12-07T14:00:00").toDate(),
    end: moment("2024-12-07T14:30:00").toDate(),
    resource: "1",
  },
];


function onSelectEventFunction() {
  console.log("i am available");
}
const AvailabilityCalendar = (props) => {
  const { eventListData } = props;
  console.log(props, "pop");
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventListData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day", "agenda"]}
        selectable={false}
        onSelectEvent={() => onSelectEventFunction()}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
          },
        })}
      />
    </div>
  );
};

export default AvailabilityCalendar;
