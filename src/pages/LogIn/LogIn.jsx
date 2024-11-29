
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
import axios from 'axios';
import LoginForm from '../../Components/LogInForm/LogInForm'; // Import LoginForm

function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

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
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}

      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;