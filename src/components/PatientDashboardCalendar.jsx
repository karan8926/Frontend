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
  isBefore,
  startOfDay,
} from "date-fns";
const PatientDashboardCalendar = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  setCurrentMonth,
}) => {
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

  // const renderDates = () => {
  //   const monthStart = startOfMonth(currentMonth);
  //   const monthEnd = endOfMonth(monthStart);
  //   const startDate = startOfWeek(monthStart);
  //   const endDate = endOfWeek(monthEnd);
  //   const dates = [];
  //   let day = startDate;
  //   const today = startOfDay(new Date());
  //   while (day <= endDate) {
  //     const week = [];
  //     for (let i = 0; i < 7; i++) {
  //       const currentDay = day;
  //       const isPast = isBefore(currentDay, today); // Check if the current day is before today
  //       week.push(
  //         <div
  //           key={currentDay}
  //           className={`p-2 border border-gray-400 text-center cursor-pointer ${
  //             !isSameMonth(currentDay, monthStart)
  //               ? "bg-gray-100 text-gray-400"
  //               : isSameDay(currentDay, selectedDate)
  //               ? "bg-blue-500 text-white"
  //               : "hover:bg-blue-100"
  //           } ${isPast ? "bg-gray-200 text-gray-500 pointer-events-none" : ""}`} // Inactive past days
  //           onClick={() => !isPast && onDateSelect(currentDay)} // Disable click for past days
  //         >
  //           {format(currentDay, "d")}
  //         </div>
  //       );
  //       day = addDays(day, 1);
  //     }
  //     dates.push(
  //       <div key={day} className="grid grid-cols-7 h-[4rem] ">
  //         {week}
  //       </div>
  //     );
  //   }
  //   return dates;
  // };

  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dates = [];
    let day = startDate;
    const today = startOfDay(new Date());

    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isPast = isBefore(currentDay, today); // Check if the current day is before today
        // Only render days that belong to the current month
        if (isSameMonth(currentDay, monthStart)) {
          week.push(
            <div
              key={currentDay}
              className={`p-2 border border-gray-400 text-center cursor-pointer ${
                isSameDay(currentDay, selectedDate)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              } ${
                isPast ? "bg-gray-200 text-gray-500 pointer-events-none" : ""
              }`} // Inactive past days
              onClick={() => !isPast && onDateSelect(currentDay)} // Disable click for past days
            >
              {format(currentDay, "d")}
            </div>
          );
        } else {
          // If the day is from another month, push an empty div or skip it.
          week.push(
            <div
              key={currentDay}
              className="p-2 border border-gray-400 text-center"
            ></div>
          );
        }
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
      {/* {renderHeader()} */}
      {renderDaysOfWeek()}
      {renderDates()}
    </div>
  );
};

export default PatientDashboardCalendar;
