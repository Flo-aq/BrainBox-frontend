import React, {useState} from 'react';
import './ClassCard.css';
import Popup from '../PopUp/PopUp';
import axios from 'axios';

const ClassCard = ({ course }) => {

  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });
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

  const handleClick = async () => {
    if (modified) {
      try {
        const courseId = course.id;
        const response = await axios.delete(`${apiUrl}/cursoestudiante`, {
          data: { id: courseId } // Change from 'id' to 'data' for axios delete
        });
        
        openPopup('Éxito', 'Se eliminó la clase.', false);
      } catch (error) {
        openPopup('Error', 'Hubo un problema al eliminar la clase.', true);
      }
    }
  };

  return (
    <>
      <div className="class-card">
        <div className='class-card-content'>
          <div className="title">
            <h2 className="text">{course.nombre}</h2>
          </div>
          <div className="banners">
            <div className="banner credits">
              <p className='text'>{course.creditos} créditos</p>
            </div>
            {course.horario.split(', ').map((time, index) => (
              <div className="banner schedule" key={index}>
                <p className='text'>{time}</p>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="boton-2 delete" onClick={handleClick}>Eliminar</button>
          </div>
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

export default ClassCard;