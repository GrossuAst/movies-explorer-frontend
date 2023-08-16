import React from 'react';

import { NavLink } from 'react-router-dom';

import './Sidebar.css';

function Sidebar({ isSidebarOpen, closeSidebar }) {
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    // в зависимости от стейта, сайдбар открыт или закрыт
    // также нужно добавить плавное открыти-закрытие
    // const [isSidebarOpen, setSidebarOpen] = React.useState(true);

    // function changeSidebarVisible() {
    //     isSidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true);
    // }

    return (
        <div className={isSidebarOpen ? 'sidebar sidebar_active' : 'sidebar'}>
            <div className='sidebar__menu'>
                <div className='sidebar__close-button' onClick={closeSidebar}></div>
                <nav className='sidebar__nav'>   
                    <ul className='sidebar__nav-list'>
                        <li>
                            <NavLink to='/' 
                                className={({isActive}) => `sidebar__nav-link sidebar__nav-link_type_logged-in ${isActive ? 'sidebar__nav-link_active' : ''}`}
                            >
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/movies' 
                                className={({isActive}) => `sidebar__nav-link sidebar__nav-link_type_logged-in ${isActive ? 'sidebar__nav-link_active' : ''}`}
                            >
                                Фильмы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/saved-movies' 
                                className={({isActive}) => `sidebar__nav-link sidebar__nav-link_type_logged-in ${isActive ? 'sidebar__nav-link_active' : ''}`}
                            >
                                Сохранённые фильмы
                            </NavLink>
                        </li>
                    </ul>
                        <NavLink to='/profile' className='sidebar__account-button sidebar__account-button_type_logged-in' style={linkStyle}>
                                Аккаунт
                                <div className='sidebar__account-logo sidebar__account-logo_type_logged-in'></div>
                        </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;