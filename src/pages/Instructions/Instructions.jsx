import './Instructions.css';
import Accordion from '../../Components/Accordion/Accordion'


function Instructions() {
    const data = [
        { instruction: "¿Como inicio sesión?", 
          explanation: "Si no te has registrado primero debes dirigirte a la pagina de Sign Up y crear tu usuraio.\
           Luego puedes inicar sesión desde la pagina de Log In con las credenciales que creaste anteriormente." },

        { instruction: "¿Cómo creo un evento?", 
          explanation: "Desde tu pagina Main, donde puedes ver un calendario, debes hacer click en 'Crear Evento'\
           y llenar todos los datos que te soliciten. Al terminar, podrás ver tu evento agregado al calendario." },

    ];
    return (
        <div className='content'>
            <div className='header-container'>
                <p className='title'>¿Cómo usar este planner?</p>
                <p className='text'>
                  Aqui podrás encontrar una pequeña guía de cómo usar este planer para mejorar tu estudio
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
