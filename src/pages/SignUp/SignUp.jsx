import './SignUp.css'

import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [Nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContraseena] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        Nombre: Nombre,
        correo: correo,
        contrasena: contrasena
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); // aquí puede haber más lógica para tratar los errores
      });
    }

  return (
    <div classnombre="Login">
      {msg.length > 0 && <div classnombre="successMsg"> {msg} </div>}

      {error && <div classnombre="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input 
            type="text" 
            nombre="Nombre"
            value={Nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          correo:
          <input 
            type="correo" 
            nombre="correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          contrasena:
          <input 
            type="contrasena" 
            nombre="contrasena"
            value={contrasena}
            onChange={e => setContraseena(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Signup;