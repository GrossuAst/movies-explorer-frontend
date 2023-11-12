import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { mainApi } from '../../utils/MainApi';

import { CurrentUserContext } from '../contexts/CurrentUser'

import { useForm, useFormWithValidation } from '../../hooks/Validation';

function Profile({ clearCookies, setUserData, handleUpdateProfile, openSidebar }) {
    const location = useLocation();
    const isProfilePage = location.pathname === '/profile';
    const linkStyle = {
        textDecoration: 'none',
    };

    // подписка на контекст
    const userData = React.useContext(CurrentUserContext);

    // стейт для управления инпутами
    const [isInputDisabled, setInputDisable] = React.useState(true);

    // если стейт false, рендерится компонент редактировать/выйти из аккаунат
    // если стейт true, рендерится кнопка сохранения данных
    const [isEditProfileFormActive, setEditProfileFormActive] = React.useState(false);

    const [isResponseError, setIsResponseError] = React.useState(false);

    function activateInput() {
        isInputDisabled ? setInputDisable(false) : setInputDisable(true);
    };

    const { values, setValues, errors, isValid, handleChange } = useFormWithValidation({ name: userData.data.name, email: userData.data.email });

    React.useEffect(() => {
        setValues({ ...values, name: userData.data.name, email: userData.data.email });
    }, [setValues]);

    // console.log(values);

    function handleSubmit(evt) {
        evt.preventDefault();
        handleUpdateProfile({ name: values.name, email: values.email })
        
    };
    
    // обновление данных профиля
    function handleUpdateProfile({ name, email }) {
        mainApi.updateProfile({ email, name })
        .then((res) => {
            setUserData(res);
            setIsResponseError(false);
        })
        .catch((err) => {
            setIsResponseError(true);
        })
    };
    
    // в зависимости от стейта открывает/закрывает форму редактирования профиля
    function editProfile() {
        isEditProfileFormActive ? setEditProfileFormActive(false) : setEditProfileFormActive(true);
        activateInput();
    };

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
                        <Link to='/movies' className='header__nav-link'>
                            Фильмы
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies' className='header__nav-link'>
                            Сохранённые фильмы
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' style={linkStyle} className='header__account-button'>      
                            Аккаунт
                            <div className={isProfilePage ? 'header__account-logo' : ''}></div>
                    </Link>
                </div>
            </nav>
        </Header>
        <main className='main'>
            <section className='profile'>
                <div className='profile__wrapper'>
                    <h1 className='profile__title'>Привет, { userData.data.name }!</h1>
                    <div className='profile__info-container'>
                        <form onSubmit={ handleSubmit } noValidate>
                            <div className='profile__info'>
                                <label className='profile__user' htmlFor={'name-input-change'}>Имя</label>
                                <input className='profile__user-input' id='name-input-change' type='text' name='name' placeholder='Имя' minLength={2} maxLength={30} required
                                    // pattern="^[a-zA-Zа-яА-Я\s-]+$"
                                    disabled={ isInputDisabled } 
                                    defaultValue={ userData.data.name }
                                    onChange={ handleChange }
                                ></input>
                            <ErrorMessage message={ errors.name }/>    
                            </div>
                            
                            <div className='profile__info'>
                                <label className='profile__user' htmlFor={'email-input-change'}>E-mail</label>
                                <input className='profile__user-input' id='email-input-change' name='email' type='email' required
                                    disabled={ isInputDisabled }  placeholder='Почта'
                                    // pattern='/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
                                    defaultValue={ userData.data.email }
                                    onChange={ handleChange }
                                ></input>
                                <ErrorMessage message={ errors.email }/>
                            </div>
                            
                            <div className='profile__control'>
                                {/* если стейт false, рендерится компонент редактировать/выйти из аккаунат */}
                                {/* если стейт true, рендерится кнопка сохранения данных  */}

                                { isEditProfileFormActive ?
                                (
                                    <>
                                        {/* Чтобы убрать ошибку, нужно удалить модификатор 'profile__error-message_active' у <p> */}
                                        <p className='profile__error-message'>
                                            { isResponseError && 'При обновлении профиля произошла ошибка.' }
                                        </p>
                                        
                                        
                                        {/* чтобы включить кнопку, нужно убрать модификатор */}
                                        <button
                                            className={ isValid ? 'profile__save-button' : 'profile__save-button profile__save-button_disabled' }
                                            type='submit' 
                                            disabled={ !isValid }
                                        >
                                            Сохранить
                                        </button>
                                    </>
                                ) : 
                                (
                                <>
                                    <button className='profile__edit-button'  type='button'
                                        onClick={editProfile}
                                    >
                                        Редактировать
                                    </button>
                                    <Link to='/' className='profile__logout-button' 
                                        onClick={ clearCookies }
                                    >
                                        Выйти из аккаунта
                                    </Link>
                                </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>  
            </section>
        </main>
    </>
  );
}

export default Profile;