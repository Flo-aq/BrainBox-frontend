import React, {useState} from 'react';
import Calendar from '../../Components/Calendar/Calendar';
import CreateEventModal from '../../Components/CreateEvent/CreateEventModal';
import './Calendar.css';

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([
    { date: new Date('October 4, 2024 00:00:00'), title: 'T3 de Web' },
    { date: new Date('October 11, 2024 00:00:00'), title: 'E0 de Web' },
    { date: new Date('October 21, 2024 00:00:00'), title: 'C3 de Web' },
    { date: new Date('October 25, 2024 00:00:00'), title: 'E1 de Web' },
  ]);

  const handleCreateEvent = (eventData) => {
    console.log('Evento creado:', eventData);
    setEvents([...events, {date: eventData.fecha, title: eventData.nombreEvento}]);
  };

  return (
    <>
      <div className="container-title">
        <button onClick={() => setShowModal(true)}>Crear evento</button>
        <CreateEventModal
          isOpen={showModal}
          onClose={() => setShowModal(false)} // Función para cerrar el modal
          onCreateEvent={handleCreateEvent} // Pasar la función para manejar la creación del evento
      />
        <Calendar events={events}/>
      </div>
    </>
  );
}

export default CalendarPage;
