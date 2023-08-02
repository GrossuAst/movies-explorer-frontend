import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Login.css';
import '../../styles/commonStyles.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Login() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signin';

    return (
        <>
            <Header 
                headerMixin={isLoginPage ? 'header_type_form-page' : ''}
                wrapperMixin={isLoginPage ? 'header__wrapper_type_form-page' : ''}
            >
                <h1 className='header__title_type_form-page'>Рады видеть!</h1>
            </Header>
            <main>
                <section className='form-page'>
                    <div className='form-page__wrapper'>          
                        <form className='form-page__form'>
                            <div className='form-page__input-block'>                            
                                <p className='form-page__input-title'>E-mail</p>
                                <input className='form-page__input' placeholder='Почта' type={'email'} minLength={5}></input>
                            </div>
                            <div className='form-page__input-block'>
                                <p className='form-page__input-title'>Пароль</p>
                                <input className='form-page__input' placeholder='Пароль' type={'password'}></input>
                            </div>
                            <p className='form-page__error-message'></p>
                            <button className='form-page__button form-page__button_type_login' type='submit'>Войти</button>
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
