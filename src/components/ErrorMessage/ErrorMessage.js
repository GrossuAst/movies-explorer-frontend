import React from 'react';

import './ErrorMessage.css';
import { useLocation } from 'react-router-dom';

 function ErrorMessage({ message }) {

    const location = useLocation();

    const registerPage = location.pathname === '/signup';
    const loginPage = location.pathname === '/signin';
    const moviesPage = location.pathname === '/movies';
    const savedMoviesPage = location.pathname === '/saved-movies';

    const errorClass = 
    registerPage ? 'error-message error-message_type_register' : 
    loginPage ? 'error-message error-message_type_login' : 
    moviesPage ? 'error-message error-message_type_movies' : 
    savedMoviesPage ? 'error-message error-message_type_saved-movies' :
    'error-message';

    return(
        <p className={ errorClass }>{message}</p>
    )
};

export default ErrorMessage;