import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Register.css';
import '../../styles/commonStyles.css';
// import '../Header/Header.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Register() {
    const location = useLocation();
    const isRegisterPage = location.pathname === '/signup';

    return (
        <> 
        {/* добавить фалидацию форм */}
            <Header 
                headerMixin={isRegisterPage ? 'header_type_form-page' : ''}
                wrapperMixin={isRegisterPage ? 'header__wrapper_type_form-page' : ''}
            >
                <h1 className='header__title_type_form-page'>Добро пожаловать!</h1>
            </Header>
            <main>
                <section className='form-page'>
                    <div className='form-page__wrapper'>          
                        <form className='form-page__form'>
                            <div className='form-page__input-block'>                            
                                <p className='form-page__input-title'>Имя</p>
                                <input className='form-page__input' placeholder='Имя' type={'text'} required minLength={2} maxLength={30}></input>
                            </div>
                            <div className='form-page__input-block'>                            
                                <p className='form-page__input-title'>E-mail</p>
                                <input className='form-page__input' placeholder='Почта' type={'email'} required maxLength={40}></input>
                            </div>
                            <div className='form-page__input-block'>
                                <p className='form-page__input-title'>Пароль</p>
                                <input className='form-page__input' placeholder='Пароль' type={'password'} required minLength={5} maxLength={40}></input>
                            </div>
                            <div className='form-page__error-message-container'>
                                
                                {/* удалить модификатор для отключения ошибки */}
                                <p className='form-page__error-message form-page__error-message_active'>Произошла ошибка</p>
                            </div>
                            <button className='form-page__button form-page__button_type_register' type='submit'>Зарегистрироваться</button>
                            <p className='form-page__question'>Уже зарегистрированы?
                                <Link to='/signin'>
                                    <span className='form-page__link'>&nbsp;Войти</span>
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
  
  export default Register;