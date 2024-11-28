import './Instructions.css';
import Accordion from '../../Components/Accordion/Accordion';
import image_1 from '../../Images/boton-add-event-instruction-event.png'
import image_2 from '../../Images/form-instruction-event.png'
import image_3 from '../../Images/dinamyc-validation-instruction-event.png'
import image_4 from '../../Images/all-day-instruction-event.png'
import image_5 from '../../Images/botones-event-instruction.png'

function Instructions() {
    const divsData = [
        { text: 'En la página Main, en la esquina superior derecha hz click en el botón AddEvent', imgSrc: image_1 },
        { text: 'Se abrirá un formulario al centro de la página', imgSrc: image_2 },
        { text: 'No tienes que esperar a mandar el form para ver si lo completaste bien, la validación es dinámica', imgSrc: image_3 },
        { text: 'Si quieres que el evento dure todo el día, puedes seleccionar Todo el día', imgSrc: image_4 },
        { text: 'Si te arrepientes, puedes aprretar el botón de cancelar, y volverás al calendario, sin cambios hechos. Y si estás listo, y completaste bien el formulario, selecciona el boton de Crear (que se pondrá verde solo si tu formulario está bien completado). ¡Ambos botones están en la esquina inferior derecha!', imgSrc: image_5 },
      ];

    const data = [
        { 
            instruction: "¿Como inicio sesión?", 
            explanation: (
                <div>
                    Si no te has registrado primero debes dirigirte a la pagina de Sign Up y crear tu usuario.
                    Luego puedes iniciar sesión desde la página de Log In con las credenciales que creaste anteriormente.
                </div>
            )
        },
        { 
            instruction: "¿Cómo creo un evento?", 
            explanation: (
                <div>
      {divsData.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px', textAlign: 'left' , display: 'flex', flexDirection: 'column'}}>
          <p>{item.text}</p>
          <img src={item.imgSrc} alt={`Imagen ${index + 1}`} style={{
              width: index === 1 || index === 2 || index === 3 ? '300px' : '150px', // Cambiar el tamaño si el índice es 2
              alignSelf: 'center',
            }} />
        </div>
      ))}
    </div>
            )
        },
    ];

    return (
        <div className='content'>
            <div className='header-container'>
                <p className='title'>¿Cómo usar este planner?</p>
                <p className='text'>
                    Aquí podrás encontrar una pequeña guía de cómo usar este planner para mejorar tu estudio
                    y organizar tus ramos de la mejor manera posible.
                </p>
            </div>
            <div className='content-container'>
                {data.map((item, index) => (
                    <Accordion
                        key={index} 
                        title={item.instruction}
                        content={item.explanation}
                    />
                ))}
            </div>
        </div>
    );
}

export default Instructions;
