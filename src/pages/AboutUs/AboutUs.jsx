import './AboutUs.css'
import flo_image from '../../Images/flo-image.png'
import cata_image from '../../Images/cata-image.png'
import vicho_image from '../../Images/vicho-image.png'

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
          <div className="card-client card-1">
            <div className="user-picture">
              <img src={cata_image}></img>
            </div>
            <p className="name-client"> Catalina Schulz
            </p>
            <p className='desc-client'>3° año de College de Ciencias Naturales
            </p>

          </div>

          <div className="card-client card-2">
            <div className="user-picture">
              <img src={flo_image}></img>
            </div>
            <p className="name-client"> Florencia Aqueveque

            </p>
            <p className='desc-client'>4° año de Ingeniería Civil con major en Robótica
            </p>

          </div>

          <div className="card-client card-3">
            <div className="user-picture">
              <img src={vicho_image}></img>
            </div>
            <p className="name-client"> Vicente Fernández

            </p>
            <p className='desc-client'>4° año de Ingenieria Civil con major en Computación
            </p>

          </div>
        </div>

      </div>

    </>
  )
}

export default AboutUs
