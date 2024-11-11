import React, { useState } from 'react';
import './Popup.css'; // Aquí puedes personalizar el estilo del popup

const Popup = ({ title, message, isOpen, onClose }) => {
  if (!isOpen) return null; // No renderiza el popup si isOpen es false

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="popup-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
