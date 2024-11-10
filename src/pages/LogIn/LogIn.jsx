import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

import axios from 'axios';
import './Login.css';


function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
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
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="correo" 
            name="correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          contrasena:
          <input 
            type="contrasena" 
            name="contrasena"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default Login;