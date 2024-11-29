import React from 'react';
import './Popup.css';

const Popup = ({ title, message, isOpen, onClose, onRetry, onFormClose, isError }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className='popup-icon'>
          {isError ?
            <svg className='error' width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
            </svg> :
            <svg className='valid' width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round" fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z" />
            </svg>}
        </div>
        <div className="popup-header">
          <h2>{title}</h2>
        </div>
        <div className="popup-body">
          <p>{message}</p>
        </div>
        <div className="popup-actions">
          {isError && <button className="boton-2 popup-button-retry" onClick={onRetry}>Reintentar</button>}
          <button className="boton-2 popup-button-close" onClick={onFormClose}>Ok</button>
          {isError && <button className="boton-2 popup-button" onClick={onClose}>Cerrar</button>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
