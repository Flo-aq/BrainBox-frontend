import React, { useEffect, useState } from 'react';
import CalendarWeekView from '../../Components/CalendarWeekView/CalendarWeekView';
import CalendarMonthView from '../../Components/CalendarMonthView/CalendarMonthView';
import './Calendar.css';
import axios from 'axios';
import {
  format,
  startOfWeek,
  addDays,
  getDate,
  getMonth,
  getYear,
  getHours,
  getMinutes,
} from "date-fns";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  //TODO change user id
  const userId = 1;
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';

  const parseAndAdjustDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    const adjustedDate = new Date(year, month - 1, day, hours, minutes);
    return adjustedDate;
  };

  const getTasksEvaluations = async () => {
    try {
      const cursosResponse = await axios.get(`${apiUrl}/cursos/estudiante/${userId}`);

      if (cursosResponse && cursosResponse.data && Array.isArray(cursosResponse.data)) {
        const cursos = cursosResponse.data;

        const tasksAndEvaluationsData = await Promise.all(
          cursos.map(async (curso) => {
            const tareasResponse = await axios.get(`${apiUrl}/tareas_entregas/curso/${curso.id}`);
            const evaluacionesResponse = await axios.get(`${apiUrl}/evaluaciones/curso/${curso.id}`);

            const tareas = tareasResponse.data.map(tarea => ({
              type: 'task',
              name: tarea.nombre,
              startDate: parseAndAdjustDate(tarea.fecha_comienzo),
              endDate: parseAndAdjustDate(tarea.fecha_entrega),
              course: curso.id,
              weight: tarea.valor,
            }));

            const evaluaciones = evaluacionesResponse.data.map(evaluacion => ({
              type: 'evaluation',
              name: evaluacion.nombre,
              startDate: parseAndAdjustDate(evaluacion.fecha_inicio),
              endDate: parseAndAdjustDate(evaluacion.fecha_fin),
              course: curso.id,
              weight: evaluacion.valor,
            }));

            return [...tareas, ...evaluaciones];
          })
        );

        const allEvents = tasksAndEvaluationsData.flat();
        setEvents(allEvents);
      } else {
        console.error('La respuesta de cursos no es un array:', cursosResponse);
      }
    } catch (error) {
      console.error('Error fetching tasks and evaluations:', error);
    }
  };

  useEffect(() => {
    getTasksEvaluations();
  });

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });

  return (
    <>
      <div className="calendar-content-container">
        <div className='calendar'>
          <div className="header">
            <h2 className="currentMonth">{format(weekStartDate, "MMMM yyyy")}</h2>
            <button
              className="boton-2 navIcon previous"
              onClick={() => setActiveDate(addDays(activeDate, -7))}
            >{"<"}</button>
            <button className="boton-2 today" onClick={() => setActiveDate(new Date())}>Today</button>
            <button
              className="boton-2 navIcon next"
              onClick={() => setActiveDate(addDays(activeDate, 7))}
            >{">"}</button>
            <button className="boton-2 createEvent" onClick={handleOpenForm}>Add event</button>
          </div>
          <CalendarWeekView
            events={events}
            activeDate={activeDate}
            isFormOpen={isFormOpen}
            handleCloseForm={handleCloseForm}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
