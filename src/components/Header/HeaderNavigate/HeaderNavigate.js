import { Link } from 'react-router-dom';

import './HeaderNavigate.css'

// получает от компонента App функцию открытия сайдбара
function HeaderNavigate ({ openSidebar }) {
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    return (
        <div>
            <nav className='header__nav'>
                <button className='header__menu' type='button' onClick={openSidebar}></button>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies' className='header__nav-link header__nav-link_type_logged-in'>
                            Фильмы
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies' className='header__nav-link header__nav-link_type_logged-in'>
                            Сохранённые фильмы
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' className='header__account-button header__account-button_type_logged-in' style={linkStyle}>
                            Аккаунт
                            <div className='header__account-logo header__account-logo_type_logged-in'></div>
                    </Link>
                </div>
            </nav>
          </div>
    )
}

export default HeaderNavigate;