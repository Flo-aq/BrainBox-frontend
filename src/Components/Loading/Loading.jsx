import brain_image from '../../Images/brain-landing-page.png';
import box_image from '../../Images/box-landing-page.png';
import shadow_image from '../../Images/shadow-box-landing-page.svg';
import './Loading.css'

export const Loading = () => {
  return (
    <div className='loading-container'>
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
      <div className='text'>
        <p>Cargando</p>
      </div>
    </div>
  )
}
