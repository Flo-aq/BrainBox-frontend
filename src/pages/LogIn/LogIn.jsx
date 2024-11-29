
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import './LogIn.css';
import axios from 'axios';
import LoginForm from '../../Components/LogInForm/LogInForm'; // Import LoginForm
import Popup from '../../Components/PopUp/PopUp';

function Login() {
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

  const handleSubmit = async (event, correo, contrasena) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      correo: correo,
      contrasena: contrasena
    }).then((response) => {
      console.log('Login successful');
      // Recibimos el token y lo procesamos
      const access_token = response.data.access_token;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      console.log("Se seteo el token: ", token);
      openPopup('Éxito', 'El login fue exitoso.', false);
    }).catch((error) => {
      console.error('An error occurred while trying to login:', error);
      openPopup('Error', 'Hubo un problema al hacer login.', true);
    });

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