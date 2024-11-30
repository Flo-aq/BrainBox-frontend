import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem('role'); 

    if (!allowedRoles.includes(userRole)) {
   
        return <Navigate to="/unauthorized" />;
    }

    return children; 
};

export default ProtectedRoute;