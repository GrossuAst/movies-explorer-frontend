import { Link } from 'react-router-dom';

import './HeaderNavigate.css'

function HeaderNavigate () {
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    return (
        <div>
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies'>
                            <button className='header__nav-link header__nav-link_type_logged-in'>Фильмы</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies'>
                            <button className='header__nav-link header__nav-link_type_logged-in'>Сохранённые фильмы</button>
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' style={linkStyle}>
                        <button className='header__account-button header__account-button_type_logged-in'>
                            Аккаунт
                            <div className='header__account-logo header__account-logo_type_logged-in'></div>
                        </button>
                    </Link>
                </div>
            </nav>
          </div>
    )
}

export default HeaderNavigate;