import React, { useEffect, useState } from 'react';
import './AddClassModal.css';
import Popup from '../PopUp/PopUp';
import axios from 'axios';

const AddClassModal = ({ allClasses, userClasses, onClose }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [modified, setModified] = useState(false);
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });
  const id = localStorage.getItem("userId");
  const apiUrl = 'https://grupo5-backend-24-2-ga6y.onrender.com';
  const openPopup = (title, message, isError = false) => {
    setPopup({ isOpen: true, title, message, isError });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, title: '', message: '', isError: false });
  };

  const handleFormClose = () => {
    closePopup();
    onClose();
  };

  const handleRetry = () => {
    closePopup();
    handleSubmit(); // Intenta enviar el formulario de nuevo
  };

  useEffect(() => {
    setAvailableClasses(allClasses.filter(course => !userClasses.some(userCourse => userCourse.id === course.id)));
  }, [allClasses, userClasses]);

  const handleSelectChange = (e) => {
    setSelectedClass(e.target.value);
    setModified(true);
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (modified) {
      try {
        const course = allClasses.filter(course => course.nombre === selectedClass);
        const courseId = course.id;
        const response = await axios.post(`${apiUrl}/cursoestudiante`,
          {
            estudiante_id: id,
            curso_id: courseId,
          }
        )
        openPopup('Éxito', 'Se añadió la clase.', false);
      } catch (error) {
        openPopup('Error', 'Hubo un problema al añadir la clase.', true);
      }
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content-4">
          {availableClasses.length === 0 ? (
            <div className='add-class-user-content'>
              <h2>No hay más clases para que añadas</h2>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          ) : (
            <form className="add-class-user" onSubmit={handleSubmit}>
              <h2>Add a Class</h2>
              <select value={selectedClass} onChange={handleSelectChange}>
                <option value="" disabled>Select a class</option>
                {availableClasses.map(course => (
                  <option key={course.id} value={course.id}>{course.nombre}</option>
                ))}
              </select>
              <div className='buttons'>
                <button className="boton-2 submit" type="submit" disabled={!modified}>Submit</button>
                <button className='boton-2 cancel' type="button" onClick={onClose}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Popup
        title={popup.title}
        message={popup.message}
        isOpen={popup.isOpen}
        onClose={closePopup}
        onRetry={handleRetry}
        onFormClose={handleFormClose}
        isError={popup.isError}
      />
    </>

  );
};

export default AddClassModal;
