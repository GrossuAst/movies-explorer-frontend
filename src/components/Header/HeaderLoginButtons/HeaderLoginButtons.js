import { Link } from 'react-router-dom';

import './HeaderLoginButtons.css';

function HeaderLoginButtons () {
    return (
        <div className='header__buttons'>
            <Link to='/signup'>
                <button className='header__signup-button'>Регистрация</button>
            </Link>
            <Link to='/signin'>
                <button className='header__signin-button'>Войти</button>
            </Link>
        </div>
    )
}

export default HeaderLoginButtons;