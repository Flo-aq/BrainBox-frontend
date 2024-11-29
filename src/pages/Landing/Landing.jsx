import './Landing.css';
import brain_image from '../../Images/brain-landing-page.png';
import box_image from '../../Images/box-landing-page.png';
import shadow_image from '../../Images/shadow-box-landing-page.svg';
import calendar_icon from '../../Images/calendar-icon.png'
import file_icon from '../../Images/file-icon.png'
import users_icon from '../../Images/users-icon.png'

function Landing() {

  const handleSignupClick = () => {
    // Cambia 'signup.html' al nombre de tu archivo o ruta de la página de registro
    window.location.href = '/sign-up';
  };



  return (
    <div className='landing-content-container'>
      <div className='first-container'>
        <div className='text-container'>
          <p className='title'>BrainBox</p>
          <p className='subtitle'>{"El planner universitario\nque necesitas"}</p>
          <p className='text'>Organiza todos tus ramos y sesiones de estudio en un solo lugar</p>
        </div>
        <div className='image-container'>
          <div className='shadow-container'>
            <img src={shadow_image}></img>

          </div>
          <div className='box-container'>
            <img src={box_image}></img>
          </div>
          <div className='brain-container'>
            <img src={brain_image}></img>
          </div>
        </div>
      </div>
      <div className='second-container'>
        <div className='caract-box box-1'>
          <img src={calendar_icon}></img>
          <p className='caract-title'>Titulo 1</p>
          <p className='caract-desc' id='1'>Descripción 1</p>
        </div>
        <div className='caract-box box-2'>
          <img src={users_icon}></img>
          <p className='caract-title'>Titulo 2</p>
          <p className='caract-desc'>Descripción 2</p>
        </div>
        <div className='caract-box box-3'>
          <img src={file_icon}></img>
          <p className='caract-title'>Titulo 3</p>
          <p className='caract-desc'>Descripción 3</p>
        </div>
      </div>
      <div className='third-container'>
        <div className="web-like-card">
          <div className="tools">
            <div className="circle red">
              <span className="red-box"></span>
            </div>
            <div className="circle yellow">
              <span className="yellow-box"></span>
            </div>
            <div className="circle green">
              <span className="green-box"></span>
            </div>
          </div>
          <div className="final-card-content">
            <div className='text'>
              ¿Estás listo para unirte?
            </div>
            <div className='aux2'>
              <button className='boton-2 sign-up-button' onClick={handleSignupClick}>
                Sign up
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
