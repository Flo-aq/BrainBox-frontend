import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  getDate,
  getMonth,
  getYear,
  getHours,
  getMinutes,
  getDay,
  getWeekOfMonth,
  differenceInMinutes,
  getDayOfYear
} from "date-fns";
import './CalendarWeekView.css';
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import EventInfoPopUp from "../EventInfoPopUp/EventInfoPopUp";

const CalendarWeekView = ({ events, activeDate, isFormOpen, handleCloseForm }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openPopup = (event) => setSelectedEvent(event);
  const closePopup = () => setSelectedEvent(null);

  const getDaysHeader = () => {
    const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    const days = [];
    for (let day = 0; day < 7; day++) {
      const currentDate = addDays(weekStartDate, day);
      days.push(
        <div
          key={day}
          className={`day weekNames ${isSameDay(currentDate, new Date()) ? "today" : ""} ${isSameMonth(currentDate, weekStartDate) ? "" : "inactiveDay"} ${format(currentDate, "EEEE d MMMM yyyy")}`}>
          <p className="number">{format(currentDate, "dd")}</p>
          <p className="title">{format(currentDate, "E")}</p>
        </div>
      );
    }
    return (
      <>
        <div className="daysContainer">{days}</div>
      </>
    );
  };

  const getHoursColumn = () => {
    const hours = [];
    for (let hour = 1; hour < 13; hour++) {
      hours.push(
        <div key={hour} className={`hour ${hour} AM`}>
          {`${hour} AM`}
        </div>
      );
    }
    for (let hour = 1; hour < 13; hour++) {
      hours.push(
        <div key={hour + 12} className={`hour ${hour} PM`}>
          {`${hour} PM`}
        </div>
      );
    }
    return <div className="hoursColumn">{hours}</div>;
  };

  const generateDatesForCurrentWeek = (date) => {
    let currentDate = date;
    const days = [];
    for (let day = 0; day < 7; day++) {
      days.push(
        <div
          key={day}
          className={`dayColumn day-${getDay(currentDate) + 1} week-${getWeekOfMonth(currentDate)} month-${getMonth(currentDate) + 1} year-${getYear(currentDate)}
          ${isSameMonth(currentDate, startOfWeek(activeDate, { weekStartsOn: 1 })) ? "" : "inactiveDay"}
          ${isSameDay(currentDate, new Date()) ? "today" : ""}`}
        >
          {events
            .filter(event => isSameDay(event.startDate, currentDate) ||
              isSameDay(event.endDate, currentDate) ||
              (getDayOfYear(event.startDate) < getDayOfYear(currentDate) && getDayOfYear(event.endDate) > getDayOfYear(currentDate)))
            .map((event, index) => {
              const startSlot = getTimeSlotIndex(event.startDate, "start", currentDate);
              const duration = differenceInMinutes(event.endDate, event.startDate);
              const endSlot = duration < 60 ? startSlot + 6 : getTimeSlotIndex(event.endDate, "end", currentDate);
              const title = event.name;
              const textDisplay = duration > 40 ? title : "";
              const eventBoxTextHeight = `calc(100% - (0.007 * 12px + 1.5px + 12px) + 2px)`;
              const eventBoxTextLineClamp = Math.abs(Math.trunc((startSlot - endSlot) / 2)) - 1;

              return (
                <div
                  key={index}
                  className="eventBox"
                  style={{
                    gridRowStart: startSlot + 1,
                    gridRowEnd: endSlot + 1,
                  }}
                  onClick={() => openPopup(event)}
                >
                  <p
                    className="eventBoxText"
                    style={{
                      height: duration > 40 ? eventBoxTextHeight : "none",
                      WebkitLineClamp: duration > 40 ? eventBoxTextLineClamp : "none",
                      lineClamp: duration > 40 ? eventBoxTextLineClamp : "none"
                    }}
                  >
                    {textDisplay}
                  </p>
                </div>
              );
            })
          }
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return days;
  };

  const getTimeSlotIndex = (date, type, currentDate) => {
    if (type === "start" && getDayOfYear(date) < getDayOfYear(currentDate)) {
      return 0;
    }
    if (type === "end" && getDayOfYear(date) > getDayOfYear(currentDate)) {
      return 144;
    }
    const hour = getHours(date);
    const minutes = getMinutes(date);
    const slot = minutes % 10 > 5 ? Math.floor((hour * 60 + minutes) / 10) + 1 : Math.floor((hour * 60 + minutes) / 10);
    return slot;
  };

  const getWeekView = () => {
    const startDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    return (
      <div className="weekView">
        {generateDatesForCurrentWeek(startDate)}
      </div>
    );
  };

  return (
    <section className="calendar-week-view">
      {getHoursColumn()}
      <div className="calendarContent">
        {getDaysHeader()}
        {getWeekView()}
      </div>
      <CreateEventForm isOpen={isFormOpen} onClose={handleCloseForm} />
      {selectedEvent && (
        <div
          className="popup-overlay"
          onClick={(e) => e.target.className === "popup-overlay" && closePopup()} // Cierra al hacer clic fuera del popup
        >
          <EventInfoPopUp event={selectedEvent} onClose={closePopup} />
        </div>
      )}
    </section>
  );
};

export default CalendarWeekView;
