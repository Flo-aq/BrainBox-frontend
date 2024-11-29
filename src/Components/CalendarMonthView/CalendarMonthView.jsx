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
//todo
import React from "react";
import {
  format,
  startOfMonth,
  addDays,
  startOfWeek,
  isSameDay,
  isSameMonth,
  getDate,
  getMonth,
  getYear,
  getWeekOfMonth,
  getDay
} from "date-fns";
import './CalendarMonthView.css';
import CreateEventForm from "../CalendarWeekView/CreateEventForm/CreateEventForm";

const CalendarMonthView = ({ events, activeDate, isFormOpen, handleCloseForm }) => {
  // Obtener la cabecera de los días de la semana
  const getDaysHeader = () => {
    const daysOfWeek = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D']; // Lunes a Domingo
    return (
      <div className="daysHeader">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="dayHeader">{day}</div>
        ))}
      </div>
    );
  };

  // Generar las celdas del mes (días del mes)
  const generateDaysForMonth = () => {
    const startOfMonthDate = startOfMonth(activeDate);
    const startDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 });
    const days = [];
    let currentDate = startDate;
    const endDate = addDays(startDate, 42); // 6 semanas (7 días * 6 = 42 días)

    while (currentDate <= endDate) {
      const isToday = isSameDay(currentDate, new Date());
      const isCurrentMonth = isSameMonth(currentDate, activeDate);

      days.push(
        <div
          key={getDate(currentDate)}
          className={`dayCell ${isToday ? "today" : ""} ${!isCurrentMonth ? "inactiveDay" : ""}`}
        >
          <div className="dayNumber">{getDate(currentDate)}</div>
          <div className="eventsContainer">
            {events.filter(event => isSameDay(event.startDate, currentDate) || isSameDay(event.endDate, currentDate))
              .map((event, index) => (
                <div key={index} className="eventBox">
                  <p>{event.name}</p>
                </div>
              ))}
          </div>
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }

    return (
      <div className="daysGrid">
        {days}
      </div>
    );
  };

  return (
    <section className="calendar-month-view">
      {getDaysHeader()}
      {generateDaysForMonth()}
      <CreateEventForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </section>
  );
};

export default CalendarMonthView;
