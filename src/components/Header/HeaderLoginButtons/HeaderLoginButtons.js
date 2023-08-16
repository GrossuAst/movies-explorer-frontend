import { Link } from 'react-router-dom';

import './HeaderLoginButtons.css';

function HeaderLoginButtons () {
    return (
        <nav className='header__buttons'>
            <Link to='/signup' className='header__signup-button'>
                Регистрация
            </Link>
            <Link to='/signin' className='header__signin-button'>
                Войти
            </Link>
        </nav>
    )
}

export default HeaderLoginButtons;