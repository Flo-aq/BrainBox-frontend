import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext'

import './LogIn.css';


import axios from 'axios';
import LoginForm from '../../components/LogInForm/LoginForm'; 

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event, correo, contrasena) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        correo: correo,
        contrasena: contrasena
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        console.log("Se seteo el token: ", token);
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);
      });
  };

  return (
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}

      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Login;