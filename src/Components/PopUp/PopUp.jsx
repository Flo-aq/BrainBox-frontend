import React from 'react';
import './PopUp.css';

const Popup = ({ title, message, isOpen, onClose, onRetry, onFormClose, isError }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="popup-body">
          <p>{message}</p>
          <div className="popup-actions">
            {isError && <button className="popup-button" onClick={onRetry}>Reintentar</button>}
            <button className="popup-button" onClick={onFormClose}>{isError ? "Cerrar formulario" : "Cerrar"}</button>
            {isError && <button className="popup-button" onClick={onRetry}>Cerrar</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
