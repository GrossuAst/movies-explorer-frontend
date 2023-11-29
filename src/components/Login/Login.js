import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';

import { useForm, useFormWithValidation } from '../../hooks/Validation';

import './Login.css';
import '../../styles/commonStyles.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function Login({ setUserData, setLoggedIn }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signin';

    const navigate = useNavigate();

    const [isResponseError, setIsResponseError] = React.useState(false);

    const { values, errors, setErrors, isValid, handleChange, resetForm } = useFormWithValidation({ email: '', password: '', });

    async function handleSubmit(evt) {
        evt.preventDefault();
        if(isValid) {
            try {
                await mainApi.login(values.password, values.email);
                const userData = await mainApi.getInfoAboutUser();
                setLoggedIn(true);
                setUserData(userData);
                resetForm();
                navigate('/movies', { replace: true });
            } catch(err) {
                setIsResponseError(true);
            }
        }
    }

    return (
        <>
            <Header 
                headerMixin={isLoginPage ? 'header_type_form-page' : ''}
                wrapperMixin={isLoginPage ? 'header__wrapper_type_form-page' : ''}
            >
                <h1 className='header__title header__title_type_form-page'>Рады видеть!</h1>
            </Header>
            <main>
                <section className='form-page'>
                    <div className='form-page__wrapper'>          
                        <form className='form-page__form' noValidate
                            onSubmit={ handleSubmit }
                        >
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' htmlFor={'login-email'}>E-mail</label>
                                <input className='form-page__input' id='login-email' 
                                    placeholder='Почта' type={'email'} name="email"
                                    required maxLength={40}
                                    // defaultValue={ values.email }
                                    onChange={ handleChange }
                                >
                                </input>
                                <ErrorMessage message={errors.email} />
                            </div>
                            <div className='form-page__input-block'>
                                <label className='form-page__input-title' htmlFor={'login-password'}>Пароль</label>
                                <input className='form-page__input' id='login-password' 
                                    placeholder='Пароль' type={'password'} name='password'
                                    required minLength={5} maxLength={40}
                                    // defaultValue={ values.password }
                                    onChange={ handleChange }
                                >
                                </input>
                                <ErrorMessage message={errors.password} />
                            </div>
                            <p className='form-page__error-message form-page__error-message_active'>{ isResponseError ? 'Произошла ошибка' : ''}</p>
                            <button type='submit' 
                                // className='form-page__button form-page__button_type_login'
                                className={ isValid? 'form-page__button form-page__button_type_login' : 'form-page__button form-page__button_type_login-disabled'}
                                disabled={ !isValid }
                            >
                                Войти
                            </button>
                            <p className='form-page__question'>Ещё не зарегистрированы?
                                <Link to='/signup'>
                                    <span className='form-page__link'>&nbsp;Регистрация</span>
                                </Link>    
                            </p>
                        </form>
                    </div>
                </section>
            </main>
            {/* <Footer></Footer> */}
        </>
    );
  }
  
  export default Login;
