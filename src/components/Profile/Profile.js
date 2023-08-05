import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';
import Header from '../Header/Header';

function Profile() {
    const location = useLocation();
    const isProfilePage = location.pathname === '/profile';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    // если стейт false, рендерится компонент редактировать/выйти из аккаунат
    // если стейт true, рендерится кнопка сохранения данных
    const [isEditProfileFormActive, setEditProfileFormActive] = React.useState(false);

    // в зависимости от стейта открывает/закрывает форму редактирования профиля
    function editProfile() {
        isEditProfileFormActive ? setEditProfileFormActive(false) : setEditProfileFormActive(true);
    }

  return (
    <>
        <Header
            headerMixin={isProfilePage ? 'header_type_profile' : ''}
            wrapperMixin={isProfilePage ? 'header__wrapper_type_profile' : ''}
        >
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies'>
                            <button className='header__nav-link'>Фильмы</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies'>
                            <button className='header__nav-link'>Сохранённые фильмы</button>
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' style={linkStyle}>
                        <button className='header__account-button'>
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
                    <h1 className='profile__title'>Привет, Виталий!</h1>
                    <div className='profile__info-container'>
                        <div>
                            <div className='profile__info'>
                                <p className='profile__user'>Имя</p>
                                <p className='profile__user'>Виталий</p>
                            </div>
                            <div className='profile__info'>
                                <p className='profile__user'>E-mail</p>
                                <p className='profile__user'>pochta@yandex.ru</p>
                            </div>    
                        </div>
                    </div>
                    <div className='profile__control'>


                    {/* если стейт false, рендерится компонент редактировать/выйти из аккаунат */}
                    {/* если стейт true, рендерится кнопка сохранения данных  */}

                        { isEditProfileFormActive ?
                        (
                            <>
                                {/* Чтобы убрать ошибку, нужно удалить модификатор у <p> */}
                                <p className='profile__error-message profile__error-message_active'>При обновлении профиля произошла ошибка.</p>
                                <button className='profile__save-button' onClick={editProfile}>Сохранить</button>
                            </>
                        ) : 
                        (
                        <>
                            <button className='profile__edit-button' onClick={editProfile}>Редактировать</button>
                            <button className='profile__logout-button'>Выйти из аккаунта</button>
                        </>
                        )}
                    </div>
                </div>  
            </section>
        </main>
    </>
  );
}

export default Profile;