
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import axios from 'axios';
import LoginForm from '../../Components/LogInForm/LogInForm'; // Import LoginForm
import Popup from '../../Components/PopUp/PopUp';

function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
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
      correo: formData.correo,    // Cambia `email` a `correo`
      contrasena: formData.contrasena, // Cambia `password` a `contrasena`
    };

    console.log("Datos a enviar al backend:", dataToSend); // Log para ver el formato final antes de enviar
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, dataToSend);
      if (response.status === 200) {
        const { token, estudiante } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', estudiante.id);
        localStorage.setItem('email', estudiante.email);
        localStorage.setItem('role', estudiante.role)
        console.log("Login successful:", response.data);
        navigate('/calendar');
      }

    } catch (error) {
      console.error('Ocurrió un error:', error);
      setError(true);
      setMsg('Hubo un error con el Login, por favor trata nuevamente.');
    }
  };

  return (

    <>
      <div className="log-in-form-container">
        <LoginForm onSubmit={handleSubmit} />
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

export default Login;