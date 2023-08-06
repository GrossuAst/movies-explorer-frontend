import React from 'react';

import { NavLink } from 'react-router-dom';

import './Sidebar.css';

function Sidebar() {
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    // в зависимости от стейта, сайдбар открыт или закрыт
    // также нужно добавить плавное открыти-закрытие
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className={isSidebarOpen ? 'sidebar sidebar_active' : 'sidebar'}>
            <div className='sidebar__close-button'></div>
            <nav className='sidebar__nav'>   
                <ul className='sidebar__nav-list'>
                    <li>
                        <NavLink to='/'>
                            <button className='sidebar__nav-link sidebar__nav-link_type_logged-in'>Главная</button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/movies'>
                            <button className='sidebar__nav-link sidebar__nav-link_type_logged-in'>Фильмы</button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/saved-movies'>
                            <button className='sidebar__nav-link sidebar__nav-link_type_logged-in'>Сохранённые фильмы</button>
                        </NavLink>
                    </li>
                    <li>
                        
                    </li>
                </ul>
                    <NavLink to='/profile' style={linkStyle}>
                        <button className='sidebar__account-button sidebar__account-button_type_logged-in'>
                            Аккаунт
                            <div className='sidebar__account-logo sidebar__account-logo_type_logged-in'></div>
                        </button>
                    </NavLink>
            </nav>
        </div>
    )
}

export default Sidebar;