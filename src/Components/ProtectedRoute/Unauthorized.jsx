import React from 'react';
import './Unauthorized.css'; 

const Unauthorized = () => {
    return (
        <div className="unauthorized-page">
            <h1 className="unauthorized-title">Acceso Denegado</h1>
            <p className="unauthorized-message">
                No tienes permiso para acceder a esta página.
            </p>
        </div>
    );
};

export default Unauthorized;
