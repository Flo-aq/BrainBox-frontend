import React, { useEffect, useState } from 'react';
import { formatDistanceStrict, differenceInMinutes, format, getYear, getMonth, getHours, getDate, getMinutes, getSeconds } from 'date-fns';
import './EventInfo.css';

const EventInfo = ({ event }) => {

  const durationMinutes = differenceInMinutes(event.endDate, event.startDate);
  const durationText = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? "24 hours" : formatDistanceStrict(event.endDate, event.startDate);
  const startDate = `${format(event.startDate, 'PP')}`;
  const endDate = (getDate(event.startDate) === getDate(event.endDate) && getMonth(event.startDate) === getMonth(event.endDate) && getYear(event.startDate) === getYear(event.endDate)) ? null : format(event.endDate, 'PP')
  const startTime = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? "All day" : format(event.startDate, 'p');
  const endTime = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? null : format(event.endDate, 'p');
  const date = `${startDate}${endDate ? ` - ${endDate}` : ""}`;
  const time = `${startTime}${endTime ? ` to ${endTime}` : ""}`;

  const name = event.name;
  const weight = `Ponderación: ${event.weight * 100} %`;


  return (
    <div className={`event-info ${event.name}`}>
      <div className='event-info-content'>
        <h1 className='title'>{name}</h1>
        <div className='text-group'>
          <p className='text-principal'>{date}</p>
          <p className='text-secondary'>{time}</p>
        </div>
        <div className='banners'>
          <div className="banner duration">
            <p className='text'>{`⏱︎ ${durationText}`}</p>
          </div>
          <div className='banner weight'>
            <p className='text'>{weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
