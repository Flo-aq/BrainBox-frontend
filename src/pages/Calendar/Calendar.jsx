import React, { useState } from 'react';
import CalendarWeekView from '../../Components/CalendarWeekView/CalendarWeekView';
import CalendarMonthView from '../../Components/CalendarMonthView/CalendarMonthView';
import CreateEventForm from '../../Components/CreateEventForm/CreateEventForm';
import './Calendar.css';

const CalendarPage = () => {

  return (
    <>
      <div className="calendar-content-container">

        <div className="calendar">
          <CalendarWeekView />
        </div>

      </div>
    </>
  );
};

export default CalendarPage;
