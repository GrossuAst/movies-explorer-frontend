import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';

import { useForm, useFormWithValidation } from '../Validation/Validation';

import './Login.css';
import '../../styles/commonStyles.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Login({ setUserData, setLoggedIn }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signin';

    const navigate = useNavigate();

    const { values, handleChange, errors, isValid } = useFormWithValidation();

    

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        if(isValid) {
            try {
                await mainApi.login(values.password, values.email)
                const userData = await mainApi.getInfoAboutUser();
                setLoggedIn(true);
                setUserData(userData);
                // resetForm();
                navigate('/movies', { replace: true });
            } catch(err) {
                console.log(err);
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
                        <form className='form-page__form' 
                        onSubmit={ handleSubmit }
                        >
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' htmlFor={'login-email'}>E-mail</label>
                                <input className='form-page__input' id='login-email' 
                                    placeholder='Почта' type={'email'} name="email"
                                    required maxLength={40}
                                    value={values.email}
                                    onChange={ handleChange }
                                >
                                </input>
                                {errors.email && <p className='form-page__error-message'>{errors.email}</p>}
                            </div>
                            <div className='form-page__input-block'>
                                <label className='form-page__input-title' htmlFor={'login-password'}>Пароль</label>
                                <input className='form-page__input' id='login-password' 
                                    placeholder='Пароль' type={'password'} name='password'
                                    required minLength={5} maxLength={40}
                                    value={values.password}
                                    onChange={ handleChange }
                                >
                                </input>
                                {errors.password && <p className='form-page__error-message'>{errors.pasword}</p>}
                            </div>
                            <p className='form-page__error-message'></p>
                            <button className='form-page__button form-page__button_type_login'  type='submit' 
                                // disabled={!isValid}
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
