import './Instructions.css';
import Accordion from '../../Components/Accordion/Accordion';
import React from 'react';

import image_1 from '../../Images/boton-add-event-instruction-event.png'
import image_2 from '../../Images/form-instruction-event.png'
import image_3 from '../../Images/dinamyc-validation-instruction-event.png'
import image_4 from '../../Images/all-day-instruction-event.png'
import image_5 from '../../Images/botones-event-instruction.png'
import image_6 from '../../Images/login-boton.png'
import image_7 from '../../Images/login-form.png'
import image_8 from '../../Images/login-form-filled.png'
import image_9 from '../../Images/logout-boton.png'
import image_10 from '../../Images/signup-boton.png'
import image_11 from '../../Images/signup-form.png'
import image_12 from '../../Images/signup-form-filled.png'
import image_13 from '../../Images/signup-form-filled-2.png'

function Instructions() {
  const divsData = [
    {
      instruction: "¿Como inicio y cierro sesión?",
      explanation: [
        { text: 'Para iniciar sesion, desde cualquier pagina, en la esquina inferior izquierda haz click en el botón Log In', imgSrc: image_6 },
        { text: 'Se abrirá la pagina para que puedas hacer sesion con tus credenciales', imgSrc: image_7 },
        { text: 'Se marcará en verde si las credenciales tienen el formato correcto y podrás iniciar sesion al hacer click en el boton.', imgSrc: image_8 },
        { text: 'Para cerrar sesion, en la esquina inferior izquierda haz click en el botón Log Out', imgSrc: image_9 },
      ]
    },
    {
      instruction: "¿Como creo una cuenta?",
      explanation: [
        { text: 'Para crear una cuenta, desde cualquier pagina, en la esquina inferior izquierda haz click en el botón Sign Up', imgSrc: image_10 },
        { text: 'Se abrirá la pagina para que puedas crear una cuenta con tus datos', imgSrc: image_11 },
        { text: 'Se marcará en verde si los datos tienen el formato correcto (o en rojo si no cumplen con el formato)', imgSrc: image_12 },
        { text: 'Cuando todos los campos esten en verde podrás crear tu cuenta al hacer click en el boton Summit', imgSrc: image_13 },
      ]
    },
    {
      instruction: "¿Cómo creo un evento?",
      explanation: [
        { text: 'En la página Calendar, en la esquina superior derecha haz click en el botón AddEvent', imgSrc: image_1 },
        { text: 'Se abrirá un formulario al centro de la página', imgSrc: image_2 },
        { text: 'No tienes que esperar a mandar el form para ver si lo completaste bien, la validación es dinámica', imgSrc: image_3 },
        { text: 'Si quieres que el evento dure todo el día, puedes seleccionar Todo el día', imgSrc: image_4 },
        { text: 'Si te arrepientes, puedes aprretar el botón de cancelar, y volverás al calendario, sin cambios hechos. Y si estás listo, y completaste bien el formulario, selecciona el boton de Crear (que se pondrá verde solo si tu formulario está bien completado). ¡Ambos botones están en la esquina inferior derecha!', imgSrc: image_5 },
      ]
    },
  ];


  return (
    <div className='instructions-content'>
      <div className='header-container'>
        <p className='title'>¿Cómo usar este planner?</p>
        <p className='text'>
          Aquí podrás encontrar una pequeña guía de cómo usar este planner para mejorar tu estudio
          y organizar tus ramos de la mejor manera posible.
        </p>
      </div>
      <div className='instructions-content-container'>
        {divsData.map((item, index) => (
          <Accordion
            key={index}
            llave="ins"
            title={item.instruction}
            content={item.explanation}
          />
        ))}
      </div>
    </div>
  );
}

export default Instructions;
