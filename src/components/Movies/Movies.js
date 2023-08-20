import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import ExpandButton from './ExpandButton/ExpandButton';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// получает из компонента App функцию открытия сайдбара и вешает на кнопку меню
function Movies({ moviesArray, filterArray, filtredArray, visibleMovies, handleUpdateVisibleMovies, clearVisibleMoviesState, openSidebar }) {
    const location = useLocation();  // хук useLocation для определения адреса
    const isMoviesPage = location.pathname === '/movies';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };


    // проверка состояния кнопки Ещё
    let expandButtonState;
    if(filtredArray.length > 12 && visibleMovies < filtredArray.length) {
        expandButtonState = true;
    } else {
        expandButtonState = false;
    }

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
                        <Link to='/profile' className='header__account-button' style={linkStyle}>
                            Аккаунт
                            <div className='header__account-logo'></div>
                        </Link>
                    </div>
                </nav>
            </Header>
            <main className='main'>
                <SearchForm moviesArray={ moviesArray } filterArray={filterArray} clearVisibleMoviesState={clearVisibleMoviesState} ></SearchForm>
                <MovieCardList moviesArray={ moviesArray } filtredArray={filtredArray} visibleMovies={visibleMovies}></MovieCardList>
                {/* <ExpandButton></ExpandButton> */}
                {expandButtonState ?  <ExpandButton handleUpdateVisibleMovies={handleUpdateVisibleMovies}></ExpandButton> : ''}
            </main>
            <Footer></Footer>
        </>
    );
}

export default Movies;