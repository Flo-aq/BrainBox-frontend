import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import SignUpForm from '../../Components/SignUpForm/SignUpForm'; // Import SignUpForm

function SignUp() {
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event, Nombre, correo, contrasena) => {
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
        setError(true); // Aquí puede haber más lógica para tratar los errores
      });
  };

  return (
    <div className="sign-up-form-container">

      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <SignUpForm handleSubmit={handleSubmit} />

    </div>
  );
}

export default SignUp;

