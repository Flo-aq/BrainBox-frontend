import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  parseISO,
  getDate,
  getMonth,
  getYear,
  getISOWeek,
  getHours,
  getMinutes,
  getDay,
  getWeekOfMonth,
  differenceInMinutes,
  secondsToMilliseconds
} from "date-fns";
import './CalendarWeekView.css';
import CreateEventForm from '../CreateEventForm/CreateEventForm'
import axios from 'axios';

const CalendarWeekView = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [tasksAndEvaluations, setTasksAndEvaluations] = useState([]);
  const [invitaciones, setInvitaciones] = useState([]);

  const [events, setEvents] = useState([]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleEventCreation = (newEvent) => {
    // Llamas a la función pasada desde el padre para agregar el nuevo evento
    onEventCreated(newEvent);
    handleCloseForm(); // Cerrar el formulario después de crear el evento
  };

  const userId = 1; 
    const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';

    const getTasksEvaluations = async () => {
      try {
        // Obtener cursos del estudiante
        const cursosResponse = await axios.get(`${apiUrl}/cursos/estudiante/${userId}`);
        console.log("Respuesta de cursos:", cursosResponse);
  
        if (cursosResponse && cursosResponse.data && Array.isArray(cursosResponse.data)) {
          const cursos = cursosResponse.data;
  
          // Obtener tareas y evaluaciones para cada curso
          const tasksAndEvaluationsData = await Promise.all(
            cursos.map(async (curso) => {
              const tareasResponse = await axios.get(`${apiUrl}/tareas_entregas/curso/${curso.id}`);
              console.log(`Tareas para el curso ${curso.id}:`, tareasResponse);
  
              const evaluacionesResponse = await axios.get(`${apiUrl}/evaluaciones/curso/${curso.id}`);
              console.log(`Evaluaciones para el curso ${curso.id}:`, evaluacionesResponse);
  
              const tareas = tareasResponse.data.map(tarea => ({
                type: 'task',
                name: tarea.nombre,
                startDate: tarea.fecha_comienzo,
                endDate: tarea.fecha_entrega,
                course: curso.id,
                weight: tarea.valor,
              }));
  
              const evaluaciones = evaluacionesResponse.data.map(evaluacion => ({
                type: 'evaluation',
                name: evaluacion.nombre,
                startDate: evaluacion.fecha_inicio,
                endDate: evaluacion.fecha_fin,
                course: curso.id,
                weight: evaluacion.valor,
              }));
  
              return [...tareas, ...evaluaciones];
            })
          );
  
          // Flatten the array of arrays into a single array
          const allEvents = tasksAndEvaluationsData.flat();
  
          setEvents(allEvents); // Guardar eventos en el estado
          console.log(allEvents)
        } else {
          console.error('La respuesta de cursos no es un array:', cursosResponse);
        }
      } catch (error) {
        console.error('Error fetching tasks and evaluations:', error);
      }
    };
  
    useEffect(() => {
      getTasksEvaluations(); // Llamamos a la función cuando se monta el componente
    }, []);


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

  const splitLongTasks = (events) => {
    const splitEvents = [];
    events.forEach(event => {
      if (event.type === 'task') {
        const duration = differenceInMinutes(parseISO(event.endDate), parseISO(event.startDate));
        console.log(duration);
        if (duration > 24 * 60) {
          const startEvent = {
            ...event,
            name: `(Inicio) ${event.name}`,
            endDate: new Date(parseISO(event.startDate).getTime() + 60 * 60 * 1000).toISOString()
          };
          const endEvent = {
            ...event,
            name: `(Fin) ${event.name}`,
            startDate: event.endDate,
            endDate: new Date(parseISO(event.endDate).getTime() + 60 * 60 * 1000).toISOString()
          };
          splitEvents.push(startEvent, endEvent);
        } else {
          splitEvents.push(event);
        }
      } else {
        splitEvents.push(event);
      }
    });
    return splitEvents;
  };

  const generateDatesForCurrentWeek = (date, activeDate) => {
    const adjustedEvents = splitLongTasks(events);
    let currentDate = date;
    const days = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;

      days.push(
        <div
          key={day}
          className={`dayColumn day-${getDay(currentDate) + 1} week-${getWeekOfMonth(currentDate)} month-${getMonth(currentDate) + 1} year-${getYear(currentDate)}
          ${isSameMonth(currentDate, weekStartDate) ? "" : "inactiveDay"}
            ${isSameDay(currentDate, new Date()) ? "today" : ""}`}

        >

          {adjustedEvents
            .filter(event => isSameDay(parseISO(event.startDate), currentDate) ||
              isSameDay(parseISO(event.endDate), currentDate) ||
              (currentDate >= parseISO(event.startDate) && currentDate <= parseISO(event.endDate)))
            .map((event, index) => {
              const startSlot = getTimeSlotIndex(event.startDate, "start", currentDate);
              const endSlot = getTimeSlotIndex(event.endDate, "end", currentDate);
              const duration = differenceInMinutes(parseISO(event.endDate), parseISO(event.startDate));
              const title = event.name;
              const textDisplay = duration > 40 ? title : "";
              const eventBoxTextHeight = `calc(100% - (0.007 * 12px + 1.5px + 12px) + 2px)`;
              const eventBoxTextLineClamp = Math.abs(Math.trunc((startSlot - endSlot) / 2)) - 1;

              return (
                <>
                  <div
                    key={index}
                    className="eventBox"
                    style={{
                      gridRowStart: startSlot + 1,
                      gridRowEnd: endSlot + 1,
                    }}
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
                </>

              );
            })
          }
        </div>
      );

      currentDate = addDays(currentDate, 1);
    }
    return days;
  };

  const getTimeSlotIndex = (dateTime, type, currentDate) => {
    const date = parseISO(dateTime);
    if (type === "start") {
      if (getDate(currentDate) > getDate(date)) {
        return 0;
      }
    };
    if (type === "end") {
      if (getDate(currentDate) < getDate(date)) {
        return 144;
      }
    };
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return (hour * 60 + minutes) / 10; // Cada 10 minutos un bloque
  };

  const getWeekView = () => {
    const startDate = startOfWeek(activeDate, { weekStartsOn: 1 });
    return (
      <>
        <div className="weekView">
          {generateDatesForCurrentWeek(startDate, activeDate)}
        </div>
      </>
    );
  };

  const weekStartDate = startOfWeek(activeDate, { weekStartsOn: 1 });

  return (
    <section className="calendar-week-view">
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
      {getHoursColumn()}
      <div className="calendarContent">
        {getDaysHeader()}
        {getWeekView()}
      </div><CreateEventForm isOpen={isFormOpen} onClose={handleCloseForm} onEventCreated={handleEventCreation} />
    </section>
  );
};

export default CalendarWeekView;
