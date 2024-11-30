import './AdminClasses.css';
import Accordion from '../../Components/Accordion/Accordion';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventInfo from '../../Components/AdminClasses/EventInfo/EventInfo';
import { Loading } from '../../Components/Loading/Loading';
import AddClassForm from '../../Components/AdminClasses/AddClassForm/AddClassForm';
import AddTaskEvForm from '../../Components/AdminClasses/AddTaskForm/AddTaskEvForm';
import { getLogs } from '../../db/log';
import { saveLog } from '../../db/log';
import { isOnline } from '../../db/log';

function AdminClasses() {
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddClassFormOpen, setIsAddClassFormOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('');

  const openForm = (type) => {
    setFormType(type);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const openAddClassForm = () => setIsAddClassFormOpen(true);
  const closeAddClassForm = () => setIsAddClassFormOpen(false);

  const parseAndAdjustDate = (dateString) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const renderOfflineCourses = () => {
    getLogs().then(offlineData => {
      console.log('Datos recibidos:', offlineData);
      const processedCourses = Array.isArray(offlineData) ? offlineData : [];
      console.log('Datos procesados:', processedCourses);
      setCourses(processedCourses); // Actualiza el estado de cursos
      setLoading(false);
    }).catch(error => {
      console.error('Error al obtener los logs:', error);
      setLoading(false);
    });
  };

  const getCourses = async () => {
    setLoading(true);
    if (isOnline()) {
      try {
        const response = await axios.get(`${apiUrl}/cursos`);
        setCourses(response.data);
        await saveLog(response.data);
        getLogs().then((logs) => console.log('Resultado de getLogs:', logs));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    } else {
      const offlineData = await getLogs();
      if (offlineData.length > 0) {
        setCourses(offlineData);
        console.log(offlineData);
        renderOfflineCourses(offlineData);
      } else {
        console.log('No hay datos de cursos disponibles offline.');
        setCourses([]);
      }
    }
    setLoading(false);
  };

  const getTasks = async (courseId) => {
    try {
      const response = await axios.get(`${apiUrl}/tareas_entregas/curso/${courseId}`);
      return response.data.map((tarea) => ({
        type: 'task',
        name: tarea.nombre,
        startDate: parseAndAdjustDate(tarea.fecha_comienzo),
        endDate: parseAndAdjustDate(tarea.fecha_entrega),
        course: tarea.curso_id,
        weight: tarea.valor,
        id: tarea.id,
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  };

  const getEvaluations = async (courseId) => {
    try {
      const response = await axios.get(`${apiUrl}/evaluaciones/curso/${courseId}}`);
      return response.data.map((evaluacion) => ({
        type: 'evaluation',
        name: evaluacion.nombre,
        startDate: parseAndAdjustDate(evaluacion.fecha_inicio),
        endDate: parseAndAdjustDate(evaluacion.fecha_fin),
        course: evaluacion.curso_id,
        weight: evaluacion.valor,
        id: evaluacion.id,
      }));
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      return [];
    }
  };

  const fetchCourseData = async (course) => {
    const tasks = await getTasks(course.id);
    const evaluations = await getEvaluations(course.id);

    return {
      course,
      tasks,
      evaluations,
    };
  };

  useEffect(() => {
    if (isOnline() === false) {
      console.log("entro");
      setLoading(false);
      renderOfflineCourses();
      setLoading(false);
    } else {
      getCourses();
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const allData = await Promise.all(courses.map(fetchCourseData));
      setCourseData(allData);
      setLoading(false);
    };

    if (courses.length) {
      fetchAllData();
    }
  }, [courses]);

  const renderCourseContent = (data) => {
    return (
      <div className='content'>
        {data.tasks.length !== 0 ? (
          <>
            <Accordion
              title="Tareas y Entregas"
              llave="tasks"
              content={
                <div className='events-content'>
                  {data.tasks.map((task, index) => (
                    <EventInfo event={task} key={index} />
                  ))}
                  <div className='add-tasks-card'>
                    <div className='add-tasks-card-content'>
                      <button className='add-tasks' onClick={() => openForm('task')}>+</button>
                    </div>
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <div className='empty-section'>Añadir Tareas/Entregas
            <button className='add tasks' onClick={() => openForm('task')}>+</button>
          </div>
        )}

        {data.evaluations.length !== 0 ? (
          <Accordion
            title="Evaluaciones"
            llave="evs"
            content={
              <>
                <div className='events-content'>
                  {data.evaluations.map((evaluation, index) => (
                    <EventInfo event={evaluation} key={index} />
                  ))}
                  <div className='add-evs-card'>
                    <div className='add-evs-card-content'>
                      <button className='add-evs' onClick={() => openForm('evaluation')}>+</button>
                    </div>
                  </div>
                </div>
              </>
            }
          />
        ) : (
          <div className='empty-section'>Añadir Evaluaciones
            <button className='add evs' onClick={() => openForm('evaluation')}>+</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="admin-classes">
          <div className="header-container">
            <h1>Administrar Clases</h1>
            <p>Gestiona las tareas, entregas y evaluaciones de los cursos.</p>
            {!isOnline() && (
              <p className="offline-notice">Cursos OFFLINE</p>
            )}
          </div>
          <div className="content-container">
            {courses.length === 0 ? (
              <div className="empty-section">
                <p>No hay cursos disponibles. Cargando cursos offline...</p>
                {renderOfflineCourses()}
              </div>
            ) : (
              courseData.map((data, index) => (
                <Accordion
                  key={index}
                  llave="class"
                  title={data.course.nombre}
                  content={renderCourseContent(data)}
                />
              ))
            )}
            <div className='add-classes'>
              Agregar curso
              <button className='add class' onClick={openAddClassForm}>+</button>
            </div>
            <AddClassForm isOpen={isAddClassFormOpen} onClose={closeAddClassForm} courses={courses} />
          </div>
          {isFormOpen && (
            <AddTaskEvForm type={formType} isOpen={isFormOpen} onClose={closeForm} />
          )}
        </div>
      )}
    </>
  );
};

export default AdminClasses;