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
function Movies({
    // начальный массив фильмов
    initialMovies,
    setInitialMovies,
    // фильтр массива
    filterMovies,

    filterArray,
    moviesToShow,
    visibleMovies,
    handleUpdateVisibleMovies,
    clearVisibleMoviesState,
    openSidebar,
    savedArray,
    // searchMovies,
    
    isLoading,
    handleChangeLoadingStatus,
    setSavedMovies,
    cardsId,
    switchCheckboxChecked,
    shortsChecked,
    setShortsChecked,
    toggleCheckboxState,
    filterMoviesToShow,
    filterByDuration,
    
}) {

    const location = useLocation();  // хук useLocation для определения адреса
    const isMoviesPage = location.pathname === '/movies';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };


    // проверка состояния кнопки Ещё
    let expandButtonState;
    if(moviesToShow.length > 12 && visibleMovies < moviesToShow.length) {
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
                <SearchForm
                    // исходный массив фильмов
                    initialMovies={ initialMovies }
                    setInitialMovies={ setInitialMovies }
                    // фильтр массива
                    filterMovies={ filterMovies }

                    filterArray={ filterArray }
                    moviesToShow={ moviesToShow }
                    clearVisibleMoviesState={ clearVisibleMoviesState }
                    
                    handleChangeLoadingStatus={ handleChangeLoadingStatus }
                    switchCheckboxChecked={ switchCheckboxChecked }
                    shortsChecked={ shortsChecked }
                    setShortsChecked={ setShortsChecked }
                    toggleCheckboxState={ toggleCheckboxState }
                    filterMoviesToShow={ filterMoviesToShow }
                    filterByDuration={ filterByDuration }
                    
                />
                <MovieCardList 
                    initialMovies={ initialMovies } 
                    moviesToShow={ moviesToShow } 
                    visibleMovies={ visibleMovies } 
                    isLoading={ isLoading }
                    savedArray={ savedArray }
                    setSavedMovies={ setSavedMovies }
                    cardsId={ cardsId }
                    shortsChecked={ shortsChecked }
                />
                {expandButtonState ?  <ExpandButton handleUpdateVisibleMovies={ handleUpdateVisibleMovies }></ExpandButton> : ''}
            </main>
            <Footer />
        </>
    );
}

export default Movies;