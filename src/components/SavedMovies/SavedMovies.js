import { Link, useLocation } from 'react-router-dom';

import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MovieCardList from '../Movies/MoviesCardList/MovieCardList';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

// получает из компонента App функцию открытия сайдбара и вешает на кнопку меню
function SavedMovies({filtredArray, savedArray, openSidebar}) {
    const location = useLocation();  // хук useLocation для определения адреса
    const isMoviesPage = location.pathname === '/saved-movies';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    console.log(savedArray);
    
  return (
    <>
        <Header
            headerMixin={isMoviesPage ? 'header_type_movies' : ''}
            wrapperMixin={isMoviesPage ? 'header__wrapper_type_movies' : ''}
        >
            <button className='header__menu' type='button' onClick={openSidebar}></button>
            <nav className='header__nav header__nav_type_tablet'>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies' className={isMoviesPage ? 'header__nav-link header__nav-link_active' : 'header__nav-link'}>
                            {/* <button className='header__nav-link'>Фильмы</button> */}
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
                    <Link to='/profile' className='header__account-button' style={linkStyle}>
                        Аккаунт
                        <div className='header__account-logo'></div>
                    </Link>
                </div>
            </nav>
        </Header>
        <main className='main'>
            <SearchForm></SearchForm>
            <MovieCardList filtredArray={ filtredArray } savedArray={ savedArray }></MovieCardList>
        </main>
        <Footer></Footer>
        {/* <Sidebar isSidebarOpen={isSidebarOpen} changeSidebarVisible={changeSidebarVisible}></Sidebar> */}
    </>
  );
}

export default SavedMovies;