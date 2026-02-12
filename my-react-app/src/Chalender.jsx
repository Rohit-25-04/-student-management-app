import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = {
  format,
  parse,
  startOfWeek,
  getDay,
};

function AdminCalendar() {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5001/api/event")
      .then((res) => res.json())
      .then((data) => {
        // Convert date strings to JS Date objects
        const formatted = data.map((ev) => ({
          title: ev.title,
          start: new Date(ev.date),
          end: new Date(ev.date),
        }));
        setEvents(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">College Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
      />
    </div>
  );
}

export default AdminCalendar;
