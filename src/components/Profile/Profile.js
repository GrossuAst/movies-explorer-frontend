import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

function Profile({openSidebar}) {
    const location = useLocation();
    const isProfilePage = location.pathname === '/profile';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    // здесь будут данные с сервера
    const [userData, setUserData] = React.useState({name: 'Виталий', email: 'pochta@yandex.ru'});
    
    // стейт для управления инпутами
    const [isInputDisabled, setInputDisable] = React.useState(true);

    function activateInput() {
        isInputDisabled ? setInputDisable (false) : setInputDisable (true);
    }

    // если стейт false, рендерится компонент редактировать/выйти из аккаунат
    // если стейт true, рендерится кнопка сохранения данных
    const [isEditProfileFormActive, setEditProfileFormActive] = React.useState(false);

    // в зависимости от стейта открывает/закрывает форму редактирования профиля
    function editProfile() {
        isEditProfileFormActive ? setEditProfileFormActive(false) : setEditProfileFormActive(true);
        activateInput();
    }

  return (
    <>
        <Header
            headerMixin={isProfilePage ? 'header_type_profile' : ''}
            wrapperMixin={isProfilePage ? 'header__wrapper_type_profile' : ''}
        >
            <button className='header__menu' type='button' onClick={openSidebar}></button>
            <nav className='header__nav header__nav_type_tablet'>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies'>
                            <button className='header__nav-link' type='button'>Фильмы</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies'>
                            <button className='header__nav-link' type='button'>Сохранённые фильмы</button>
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' style={linkStyle}>
                        <button className='header__account-button' type='button'>
                            Аккаунт
                            <div className={isProfilePage ? 'header__account-logo' : ''}></div>
                        </button>
                    </Link>
                </div>
            </nav>
        </Header>
        <main className='main'>
            <section className='profile'>
                <div className='profile__wrapper'>
                    <h1 className='profile__title'>Привет, {userData.name}!</h1>
                    <div className='profile__info-container'>
                        <form>
                            <div className='profile__info'>
                                <label className='profile__user' for={'name-input-change'} minLength={2} maxLength={30}>Имя</label>
                                <input className='profile__user-input' id='name-input-change' disabled={isInputDisabled} name='name' value={userData.name} placeholder='Имя'></input>
                            </div>
                            <div className='profile__info'>
                                <label className='profile__user' for={'email-input-change'}>E-mail</label>
                                <input className='profile__user-input' id='email-input-change' disabled={isInputDisabled} name='email' value={userData.email} placeholder='Почта'></input>
                            </div>

                            <div className='profile__control'>
                                {/* если стейт false, рендерится компонент редактировать/выйти из аккаунат */}
                                {/* если стейт true, рендерится кнопка сохранения данных  */}

                                { isEditProfileFormActive ?
                                (
                                    <>
                                        {/* Чтобы убрать ошибку, нужно удалить модификатор у <p> */}
                                        <p className='profile__error-message profile__error-message_active'>При обновлении профиля произошла ошибка.</p>
                                        
                                        {/* чтобы включить кнопку, нужно убрать модификатор */}
                                        <button className='profile__save-button profile__save-button_disabled' onClick={editProfile} type='submit'>Сохранить</button>
                                    </>
                                ) : 
                                (
                                <>
                                    <button className='profile__edit-button' onClick={editProfile} type='button'>Редактировать</button>
                                    <Link to='/'>
                                        <button className='profile__logout-button' type='button'>Выйти из аккаунта</button>
                                    </Link>
                                </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>  
            </section>
        </main>
        {/* <Sidebar></Sidebar> */}
    </>
  );
}

export default Profile;