import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import SignUpForm from '../../Components/SignUpForm/SignUpForm'; // Import SignUpForm
import Popup from '../../Components/PopUp/PopUp';

function SignUp() {
  const [popup, setPopup] = useState({ isOpen: false, title: '', message: '' });

  const openPopup = (title, message, isError = false) => {
    setPopup({ isOpen: true, title, message, isError });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, title: '', message: '', isError: false });
  };

  const handleFormClose = () => {
    closePopup();
    window.location.href = '/userclasses';
  };

  const handleRetry = () => {
    closePopup();
    handleSubmit();
  };


  const handleSubmit = async (formData) => {

    const dataToSend = {
      nombre: formData.nombre, // Cambia `username` a `nombre`
      correo: formData.correo,    // Cambia `email` a `correo`
      contrasena: formData.contrasena, // Cambia `password` a `contrasena`
    };

    console.log("Datos a enviar al backend:", dataToSend); // Log para ver el formato final antes de enviar
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, dataToSend);
      console.log('Registro exitoso! Ahora puedes volver y loguearte');

      openPopup('Éxito', 'El signup fue exitoso.', false);
    } catch(error) {
      console.error('Ocurrió un error:', error);
      openPopup('Error', 'Hubo un problema al hacer signup.', true);
    };
  };

  return (
   <>
    <div className='sign-up-form-container'>
      <SignUpForm onSubmit={handleSubmit} />
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
}

export default SignUp;