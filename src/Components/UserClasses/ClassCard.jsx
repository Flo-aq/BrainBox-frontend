import React from 'react';
import './ClassCard.css';

const ClassCard = ({ course }) => {
  // TODO show more info of class
  // TODO delete class with api
  return (
    <div className="class-card">
      <div className='class-card-content'>
        <div className="title">
          <h2 className="text">{course.nombre}</h2>
        </div>
        <div className="banners">
          <div className="banner credits">
            <p className='text'>{course.creditos} créditos</p>
          </div>
          {course.horario.split(', ').map((time, index) => (
            <div className="banner schedule" key={index}>
              <p className='text'>{time}</p>
              </div>
          ))}
        </div>
        <div className="buttons">
          <button className="boton-2 show-more">Mostrar más</button>
          <button className="boton-2 delete">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;