import React from 'react';
import clsx from 'clsx';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isSameDay } from 'date-fns';
import './Calendar.css';

const Calendar = (props) => {
  const currentDate = new Date();
  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const daysOfMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  const startingDay = getDay(firstDay); 

  return (
    <div className='calendar'>
      <div>
        <h2 className='month'>{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className='calendar-body'>
        {days.map(day => (
          <div key={day[0]} className='day-name'>{day}</div>
        ))}
        <div className='weeks'>
        {Array.from({ length: startingDay }).map((_, index) => (
          <div key={`empty-${index}`} className='day-number'/>
        ))}
        {daysOfMonth.map((day, index) => (
          <div key={index} className={clsx('day-number', {'day-today': isToday(day)})}>
            {format(day, 'd')}
            {props.events.filter(event => isSameDay(event.date, day)).map((event, index) => (
              <div key={index} className='event'>{event.title}</div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;