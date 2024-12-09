import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
const PatientDashboardCalendar = ({ selectedDate, onDateSelect,currentMonth,setCurrentMonth }) => {
  // const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className="flex justify-between items-center py-4 px-6 bg-gray-100 border-b">
      <button
        onClick={() => setCurrentMonth((prev) => addDays(prev, -30))}
        className="text-gray-500 hover:text-gray-700"
      >
        &lt; Prev
      </button>
      <h2 className="text-lg font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth((prev) => addDays(prev, 30))}
        className="text-gray-500 hover:text-gray-700"
      >
        Next &gt;
      </button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-center bg-gray-50">
        {days.map((day) => (
          <div key={day} className="py-2 font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dates = [];
    let day = startDate;

    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        week.push(
          <div
            key={currentDay}
            className={`p-2 border text-center cursor-pointer ${
              !isSameMonth(currentDay, monthStart)
                ? "bg-gray-100 text-gray-400"
                : isSameDay(currentDay, selectedDate)
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => onDateSelect(currentDay)}
          >
            {format(currentDay, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      dates.push(
        <div key={day} className="grid grid-cols-7 h-[4rem] ">
          {week}
        </div>
      );
    }
    return dates;
  };

  return (
    <div className="w-full p-4 mx-auto shadow-lg rounded-lg overflow-hidden border h-auto">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
    </div>
  );
};

export default PatientDashboardCalendar;
