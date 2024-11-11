// import React from 'react';
// import clsx from 'clsx';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isSameDay } from 'date-fns';
// import './Calendar.css';

// const Calendar = (props) => {
//   const currentDate = new Date();
//   const firstDay = startOfMonth(currentDate);
//   const lastDay = endOfMonth(currentDate);
//   const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
//   const daysOfMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
//   const startingDay = getDay(firstDay); 

//   return (
//     <div className='calendar'>
//       <div className='calendar-header'>
//         <div className='left-buttons-container'></div>
//         <h2 className='month'>{format(currentDate, "MMMM yyyy")}</h2>
//         <div className='right-buttons-container'></div>
//       </div>
//       <div className='calendar-body'>
//         {days.map(day => (
//           <div key={day[0]} className='day-name'>{day}</div>
//         ))}
//         <div className='weeks'>
//         {Array.from({ length: startingDay }).map((_, index) => (
//           <div key={`empty-${index}`} className='day-number'/>
//         ))}
//         {daysOfMonth.map((day, index) => (
//           <div key={index} className={clsx('day-number', {'day-today': isToday(day)})}>
//             {format(day, 'd')}
//             {props.events.filter(event => isSameDay(event.date, day)).map((event, index) => (
//               <div key={index} className='event'>{event.title}</div>
//             ))}
//           </div>
//         ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Calendar;

import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  parseISO,
  getDate,
  getMonth,
  getYear
} from "date-fns";
import './CalendarMonthView.css';

const CalendarMonthView = () => {
  const [activeDate, setActiveDate] = useState(new Date());

  const getHeader = () => {
    const monthStartDate = startOfMonth(activeDate);
    const days = [];
    for (let day = 0; day < 7; day++) {
      const currentDate = addDays(startOfWeek(monthStartDate, { weekStartsOn: 1 }), day);
      days.push(
        <div key={day} className="day weekNames">
          <p className="title">{format(currentDate, "E")}</p>
        </div>
      );
    }
    return (
      <>
        <div className="header">
          <button
            className="navIcon previous"
            onClick={() => setActiveDate(addDays(activeDate, -1))}
          >{"<"}</button>
          <button
            className="navIcon next"
            onClick={() => setActiveDate(addDays(activeDate, 1))}
          >{">"}</button>
          <h2 className="currentMonth">{format(activeDate, "MMMM yyyy")}</h2>
          <div className="weekContainer">{days}</div>
        </div>
      </>
    );
  };

  const generateDatesForCurrentMonth = (date) => {
    const monthStartDate = startOfMonth(date);
    const monthEndDate = endOfMonth(date);
    const startDate = startOfWeek(monthStartDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEndDate, { weekStartsOn: 1 });

    const days = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      days.push(
        <div
          key={currentDate}
          className={`dayColumn 
            ${isSameMonth(currentDate, date) ? "" : "inactiveDay"}
            ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
        >
          <div className="date">{getDate(currentDate)}</div>
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return days;
  };

  return (
    <section className="calendar month-view">
      {getHeader()}
      <div className="monthView">
        {generateDatesForCurrentMonth(activeDate)}
      </div>
    </section>
  );
};

export default CalendarMonthView;
