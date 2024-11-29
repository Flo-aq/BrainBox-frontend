import React, { useEffect, useState } from 'react';
import { formatDistanceStrict, differenceInMinutes, format, getYear, getMonth, getHours, getDate, getMinutes, getSeconds } from 'date-fns';
import axios from 'axios';
import './EventInfoPopUp.css';

const EventInfoPopUp = ({ event, onClose }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado para indicar si estamos cargando los datos
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';

  const durationMinutes = differenceInMinutes(event.endDate, event.startDate);
  const durationText = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? "24 hours" : formatDistanceStrict(event.endDate, event.startDate);
  const startDate = `${format(event.startDate, 'PP')}`;
  const endDate = (getDate(event.startDate) === getDate(event.endDate) && getMonth(event.startDate) === getMonth(event.endDate) && getYear(event.startDate) === getYear(event.endDate)) ? null : format(event.endDate, 'PP')
  const startTime = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? "All day" : format(event.startDate, 'p');
  const endTime = durationMinutes === (24 * 60) || durationMinutes === (23 * 60 + 59) ? null : format(event.endDate, 'p');
  const date = `${startDate}${endDate ? ` - ${endDate}` : ""}`;
  const time = `${startTime}${endTime ? ` to ${endTime}` : ""} (${durationText})`;

  const name = event.name;
  const type = event.type === "event" ? "Otro" : event.type;
  const weight = event.type === "event" ? "" : `Ponderación: ${event.weight * 100} %`;
  const description = event.type === "event" ? event.descripcion : "";

  useEffect(() => {
    const fetchCourse = async () => {
      if (event.type !== 'event') {
        setLoading(true);  // Inicia la carga
        try {
          const response = await axios.get(`${apiUrl}/cursos/${event.course}`);
          setCourse(response.data.nombre);  // Establece el curso recibido
        } catch (error) {
          console.error('Error fetching course:', error);
        } finally {
          setLoading(false);  // Finaliza la carga
        }
      }
    };

    fetchCourse();
  }, [event]);

  return (
    <div className={`event-info-popup ${event.name}`}>
      <div className='content'>
        <h1 className='title'>{name}</h1>
        <div className='text-group'>
          <p className='text-principal'>{date}</p>
          <p className='text-secondary'>{time}</p>
        </div>
        {event.type === "event" ? (
          <div className='description'>
            <p className='text'>{description}</p>
          </div>
        ) : (
          <div className='banners'>
            <div className={`banner course ${loading ? 'loading' : ''}`}>
              <p className='text'>{loading ? "Cargando curso...." : course}</p>
            </div>
            <div className={`banner type ${type}`}>
              <p className='text'>{type}</p>
            </div>
            <div className='banner weight'>
              <p className='text'>{weight}</p>
            </div>
          </div>
        )}
        <button className='boton-2 cancel' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EventInfoPopUp;
