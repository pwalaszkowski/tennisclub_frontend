import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenValid = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Check if the token is still valid
};

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token && isTokenValid(token) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;