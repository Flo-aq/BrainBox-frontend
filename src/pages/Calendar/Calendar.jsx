import React, { useState, useEffect, useContext } from 'react';
import CalendarWeekView from '../../Components/CalendarWeekView/CalendarWeekView';
import './Calendar.css';
import ApiClient from '../../Api/Api';
import Popup from '../../Components/PopUp/PopUp';
import { AuthContext } from './auth/AuthContext';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [tasksAndEvaluations, setTasksAndEvaluations] = useState([]);
  const [invitaciones, setInvitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'; // Redirige manualmente al login si no hay token
    }
  }, [token]);

  const apiClient = new ApiClient(token);

  const handleEventCreation = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Función para obtener los cursos, tareas, evaluaciones e invitaciones
  const getTasksEvaluationsAndInvitations = async () => {
    try {
      // Obtener cursos del estudiante
      const cursosResponse = await apiClient.getCursosEstudiante(apiClient.studentId);
      setCursos(cursosResponse.data); // Guardar cursos en el estado

      // Obtener las invitaciones del estudiante
      const invitacionesResponse = await apiClient.getInvitacionesEstudiante(apiClient.studentId);
      setInvitaciones(invitacionesResponse.data); // Guardar invitaciones en el estado

      // Obtener tareas y evaluaciones para cada curso
      const tasksAndEvaluationsData = await Promise.all(
        cursosResponse.data.map(async (curso) => {
          const tareas = await apiClient.getTareasEntregasCurso(curso.id);
          const evaluaciones = await apiClient.getEvaluacionesCurso(curso.id);

          // Devolver un objeto con las tareas y evaluaciones de cada curso
          return {
            cursoId: curso.id,
            tareas: tareas.data, // Datos de las tareas
            evaluaciones: evaluaciones.data, // Datos de las evaluaciones
          };
        })
      );

      // Almacenar las tareas y evaluaciones combinadas en el estado
      setTasksAndEvaluations(tasksAndEvaluationsData);

      // Ahora, obtener los eventos de las invitaciones
      const invitacionesEventosData = await Promise.all(
        invitacionesResponse.data.map(async (invitacion) => {
          const evento = await apiClient.getEvento(invitacion.evento_id);
          return evento.data; // Devolver el evento completo
        })
      );

      // Combinar los eventos con las tareas y evaluaciones
      const combinedEvents = cursosResponse.data.map((curso) => {
        const cursoTasksAndEvaluations = tasksAndEvaluationsData.find(
          (item) => item.cursoId === curso.id
        );
        
        const cursoEventos = invitacionesEventosData.filter(
          (evento) => evento.curso_id === curso.id // Aseguramos que el evento pertenece al curso
        );

        return {
          courseName: curso.nombre,
          tareas: cursoTasksAndEvaluations ? cursoTasksAndEvaluations.tareas : [],
          evaluaciones: cursoTasksAndEvaluations ? cursoTasksAndEvaluations.evaluaciones : [],
          eventos: cursoEventos, // Agregar los eventos relacionados
        };
      });

      setEvents(combinedEvents); // Guardar los eventos combinados en el estado
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks, evaluations, and invitations:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksEvaluationsAndInvitations(); // Llamamos a la función cuando se monta el componente
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="calendar-content-container">
        <div className="calendar">
          {/* <CalendarWeekView events={events} onEventCreated={handleEventCreation} /> */}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
