import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { mainApi, MainApi } from '../../utils/MainApi';

import './Register.css';
import '../../styles/commonStyles.css';
// import '../Header/Header.css';

// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Register() {
    const location = useLocation();
    const isRegisterPage = location.pathname === '/signup';

    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    function handleInputChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        mainApi.register(formValue.name, formValue.email, formValue.password)
            .then(() => {
                navigate('/signin', { replace: true });
                console.log('регистрация успешна!')
            })
            .catch((err) => {
                console.log(`ошибка ${err}`);
            })
    }

    return (
        <> 
        {/* добавить фалидацию форм */}
            <Header 
                headerMixin={isRegisterPage ? 'header_type_form-page' : ''}
                wrapperMixin={isRegisterPage ? 'header__wrapper_type_form-page' : ''}
            >
                <h1 className='header__title header__title_type_form-page'>Добро пожаловать!</h1>
            </Header>
            <main>
                <section className='form-page'>
                    <div className='form-page__wrapper'>          
                        <form className='form-page__form' onSubmit={ handleRegisterSubmit }>
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' for={'register-name'}>Имя</label>
                                <input className='form-page__input' id='register-name' name='name' placeholder='Имя' type={'text'} 
                                    required minLength={2} maxLength={30}
                                    onChange={ handleInputChange }
                                ></input>
                            </div>
                            <div className='form-page__input-block'>                            
                                <label className='form-page__input-title' for={'register-email'}>E-mail</label>
                                <input className='form-page__input' id='register-email' name='email' placeholder='Почта' type={'email'} 
                                    required maxLength={40}
                                    onChange={ handleInputChange }
                                ></input>
                            </div>
                            <div className='form-page__input-block'>
                                <label className='form-page__input-title' for={'register-password'}>Пароль</label>
                                <input className='form-page__input' id='register-password' name='password' placeholder='Пароль' type={'password'} 
                                    required minLength={5} maxLength={40}
                                    onChange={ handleInputChange }
                                ></input>
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