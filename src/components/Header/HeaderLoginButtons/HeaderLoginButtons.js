import { Link } from 'react-router-dom';

import './HeaderLoginButtons.css';

function HeaderLoginButtons () {
    return (
        <nav className='header__buttons'>
            <Link to='/signup'>
                <button className='header__signup-button' type='button'>Регистрация</button>
            </Link>
            <Link to='/signin'>
                <button className='header__signin-button' type='button'>Войти</button>
            </Link>
        </nav>
    )
}

export default HeaderLoginButtons;