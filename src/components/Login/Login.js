import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { mainApi } from '../../utils/MainApi';

import './Login.css';
import '../../styles/commonStyles.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Login({ setUserData }) {
    const location = useLocation();
    const isLoginPage = location.pathname === '/signin';

    const [formValue, setFormValue] = React.useState({
        password: '',
        email: ''
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
        // console.log(evt.target.value)
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        await mainApi.login(formValue.password, formValue.email)
        const userData = await mainApi.getInfoAboutUser();
        setUserData(userData);
        // setFormValue({password: '', email: ''});
    };


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
                        <form className='form-page__form' onSubmit={handleSubmit}>
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' htmlFor={'login-email'}>E-mail</label>
                                <input className='form-page__input' id='login-email' 
                                    placeholder='Почта' type={'email'} name="email"
                                    required maxLength={40}
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                            <div className='form-page__input-block'>
                                <label className='form-page__input-title' htmlFor={'login-password'}>Пароль</label>
                                <input className='form-page__input' id='login-password' 
                                    placeholder='Пароль' type={'password'} name='password'
                                    required minLength={5} maxLength={40}
                                    onChange={handleChange}
                                >
                                </input>
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
