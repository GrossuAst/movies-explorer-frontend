import React from 'react';

import './ErrorMessage.css';
import { useLocation } from 'react-router-dom';

 function ErrorMessage({ message }) {

    const location = useLocation();

    const registerPage = location.pathname === '/signup';
    const loginPage = location.pathname === '/signin';

   const errorClass = registerPage ? 'error-message error-message_type_register' : loginPage ? 'error-message error-message_type_login' : 'error-message';

    return(
        <p className={ errorClass }>{message}</p>
    )
};

export default ErrorMessage;