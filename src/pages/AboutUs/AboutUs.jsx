import './AboutUs.css'
import imgVicente from '../../Images/imgVicente.jpg'
import imgCatalina from '../../Images/imgCatalina.jpg'
import imgFlorencia from '../../Images/imgFlorencia.jpg'

function AboutUs() {

  return (
    <>
      <div className="container-title">
        <div className="box-title">
          <div>
            <p className="title">About us</p>
            <p className="subtitle">BrainBox es una aplicación que te ayudará a organizar tu tiempo como universitario, de forma sencilla y rápida</p>
          </div>
        </div>
      </div>
      <div className='black-div'>

          <div className='header-black-div'>
            Los integrantes
          </div>

          <div className='members-container'>
            <div className="card-client">
            <div className="user-picture">
              <img src={imgCatalina} alt="Catalina Schulz" className="client-image" /> {/* Agrega la imagen aquí */}
            </div>
              <p className="name-client"> Catalina Schulz
                  <span>3° año de College de Ciencias Naturales
                  </span>
              </p>
              
            </div>

            <div className="card-client">
            <div className="user-picture">
              <img src={imgFlorencia} alt="Florencia Aqueveque" className="client-image" /> {/* Agrega la imagen aquí */}
            </div>
              <p className="name-client"> Florencia Aqueveque
                  <span>4° año de Ingeniería Civil con major en Robótica
                  </span>
              </p>
              
            </div>

            <div className="card-client">
            <div className="user-picture">
              <img src={imgVicente} alt="Vicente Fernández" className="client-image" /> {/* Agrega la imagen aquí */}
            </div>
              <p className="name-client"> Vicente Fernández
                  <span>4° año de Ingenieria Civil con major en Computación
                  </span>
              </p>
              
            </div>
          </div>

      </div>

    </>
  )
}

export default AboutUs
