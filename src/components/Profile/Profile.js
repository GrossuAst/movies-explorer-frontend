import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Profile.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

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

    

    // если стейт false, рендерится компонент редактировать/выйти из аккаунат
    // если стейт true, рендерится кнопка сохранения данных
    const [isEditProfileFormActive, setEditProfileFormActive] = React.useState(false);
    
    const [nameValue, setNameValue] = React.useState(userData.data.name);
    const [emailValue, setEmailValue] = React.useState(userData.data.email);

    const { values, setValues, errors, setErrors, isValid, handleChange } = useFormWithValidation( {name: nameValue, email: emailValue} );
    
    React.useEffect(() => {
        setNameValue(userData.name);
        setEmailValue(userData.email);
        // console.log(userData.data.name)
    }, [userData]);

    function handleNameChange(evt) {
        setNameValue(evt.target.value);
    };

    function handleEmailChange(evt) {
        setEmailValue(evt.target.value)
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        handleUpdateProfile({ name: nameValue ? nameValue : userData.data.name, email: emailValue ? emailValue : userData.data.email});
    };
    
    // стейт для управления инпутами
    const [isInputDisabled, setInputDisable] = React.useState(true);

    function activateInput() {
        isInputDisabled ? setInputDisable (false) : setInputDisable (true);
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
                        <form onSubmit={ handleSubmit }>
                            <div className='profile__info'>
                                <label className='profile__user' htmlFor={'name-input-change'}>Имя</label>
                                <input className='profile__user-input' id='name-input-change' name='name' placeholder='Имя' minLength={2} 
                                    maxLength={30}
                                    disabled={ isInputDisabled } 
                                    defaultValue={ nameValue }
                                    // value={ nameValue } 
                                    onChange={ handleNameChange }
                                ></input>
                            </div>
                            <div className='profile__info'>
                                <label className='profile__user' htmlFor={'email-input-change'}>E-mail</label>
                                <input className='profile__user-input' id='email-input-change' name='email'
                                    disabled={ isInputDisabled }  placeholder='Почта'
                                    defaultValue={ emailValue }
                                    // value={ emailValue }
                                    onChange={ handleEmailChange }
                                ></input>
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
                                        <button className='profile__save-button profile__save-button_disabled'  type='submit'
                                        >Сохранить</button>
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