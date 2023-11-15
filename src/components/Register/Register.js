import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

import { useFormWithValidation } from '../../hooks/Validation';

import './Register.css';
import '../../styles/commonStyles.css';

import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Register({ checkToken }) {
    const location = useLocation();
    const isRegisterPage = location.pathname === '/signup';

    const [isResponseError, setIsResponseError] = React.useState(false);

    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation({ name: '', email: '', password: '', });

    async function handleSubmit(evt) {
        evt.preventDefault();
        await mainApi.register( values.name, values.email, values.password )
            .then(() => {
                setIsResponseError(false);
            })
            .then(() => {
                mainApi.login(values.password, values.email)
                    .then(() =>{
                        checkToken();
                        resetForm();
                    })
            })
            .catch((err) => {
                setIsResponseError(true);
            })
    };

    return (
        <> 
            <Header 
                headerMixin={isRegisterPage ? 'header_type_form-page' : ''}
                wrapperMixin={isRegisterPage ? 'header__wrapper_type_form-page' : ''}
            >
                <h1 className='header__title header__title_type_form-page'>Добро пожаловать!</h1>
            </Header>
            <main>
                <section className='form-page'>
                    <div className='form-page__wrapper'>
                        <form className='form-page__form' noValidate
                            onSubmit={ handleSubmit }
                        >
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' htmlFor={'register-name'}>Имя</label>
                                <input className='form-page__input' id='register-name' name='name' placeholder='Имя' type={'text'} 
                                    required minLength={2} maxLength={30}
                                    onChange={ handleChange }
                                ></input>
                                <ErrorMessage message={ errors.name }/>
                            </div>
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' htmlFor={'register-email'}>E-mail</label>
                                <input className='form-page__input' id='register-email' name='email' placeholder='Почта' type={'email'}
                                    required maxLength={40}
                                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                    onChange={ handleChange }
                                ></input>
                                <ErrorMessage message={ errors.email }/>
                            </div>
                            <div className='form-page__input-block'>
                                <label className='form-page__input-title' htmlFor={'register-password'}>Пароль</label>
                                <input className='form-page__input' id='register-password' name='password' placeholder='Пароль' type={'password'} 
                                    required minLength={5} maxLength={40}
                                    onChange={ handleChange }
                                ></input>
                                <ErrorMessage message={ errors.password }/>
                            </div>
                            <div className='form-page__error-message-container'>
                                
                                {/* удалить модификатор для отключения ошибки */}
                                <p className='form-page__error-message form-page__error-message_active'>{ isResponseError ? 'Произошла ошибка' : ''}</p>
                            </div>
                            <button type='submit'
                                className={ isValid? 'form-page__button form-page__button_type_register' : 'form-page__button form-page__button_type_disabled'} 
                            
                                disabled={ !isValid }
                            >
                                Зарегистрироваться
                            </button>
                            <p className='form-page__question'>Уже зарегистрированы?
                                <Link to='/signin'>
                                    <span className='form-page__link'>&nbsp;Войти</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
  }
  
  export default Register;