import React, { useEffect, useState } from 'react';
import { formatDistanceStrict, differenceInMinutes, format, getYear, getMonth, getHours, getDate, getMinutes, getSeconds } from 'date-fns';
import EditEvTaskModal from '../EditEvTask/EditEvTaskModal';
import './EventInfo.css'

const EventInfo = ({ event }) => {

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  const handleEditClick = () => {
    setIsModalOpen(true); // Abrir el modal cuando se haga clic en el botón "Editar"
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

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
          <button className='boton-2 edit' onClick={handleEditClick}>
              <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" fill="currentColor" d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
              </svg>
            </button>
        </div>
        {isModalOpen && <EditEvTaskModal event={event} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default EventInfo;
