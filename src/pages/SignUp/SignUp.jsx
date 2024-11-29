import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import SignUpForm from '../../Components/SignUpForm/SignUpForm'; // Import SignUpForm

function SignUp() {
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");



  const handleSubmit = async (formData) => {

    const dataToSend = {
      nombre: formData.username, // Cambia `username` a `nombre`
      correo: formData.email,    // Cambia `email` a `correo`
      contrasena: formData.password, // Cambia `password` a `contrasena`
    };

    console.log("Datos a enviar al backend:", dataToSend); // Log para ver el formato final antes de enviar
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, dataToSend);
      console.log('Registro exitoso! Ahora puedes volver y loguearte');
      setError(false);
      setMsg('Registro exitoso! Ahora puedes volver y loguearte');
    } catch (error) {
      console.error('Ocurrió un error:', error);
      setError(true);
      setMsg('Hubo un error con el Registro, por favor trata nuevamente.');
    }
  };

  return (
    <div className="sign-up-form-container">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignUp;