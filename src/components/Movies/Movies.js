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

    // массив для рендера на /movies
    moviesToShow,

    // стейт чекбокса, прелоадера, ошибки ответа сервера, пустой массив для рендера
    shortsChecked,
    isLoading,
    serverErrorMessage,
    setServerErrorMessage,
    isMoviesToShowEmpty,

    // фильтр массива
    filterMovies,
    
    visibleMovies,
    handleUpdateVisibleMovies,
    clearVisibleMoviesState,
    openSidebar,
    savedMovies,
    
    handleChangeLoadingStatus,
    setSavedMovies,
    cardsId,
    switchCheckboxChecked,
    
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

                    // чекбокс и его функция, ошибка ответа сервера
                    shortsChecked={ shortsChecked }
                    toggleCheckboxState={ toggleCheckboxState }
                    setServerErrorMessage={ setServerErrorMessage }

                    // фильтр массива
                    filterMovies={ filterMovies }

                    moviesToShow={ moviesToShow }
                    clearVisibleMoviesState={ clearVisibleMoviesState }
                    
                    handleChangeLoadingStatus={ handleChangeLoadingStatus }
                    switchCheckboxChecked={ switchCheckboxChecked }
                    
                    filterMoviesToShow={ filterMoviesToShow }
                    filterByDuration={ filterByDuration }
                    
                />

                { serverErrorMessage ? 
                <p className='movie-block__no-result'>
                    Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                </p>
                :
                <MovieCardList
                    initialMovies={ initialMovies } 
                    moviesToShow={ moviesToShow }

                    shortsChecked={ shortsChecked }
                    isLoading={ isLoading } 
                    isMoviesToShowEmpty={ isMoviesToShowEmpty }
                    
                    visibleMovies={ visibleMovies }
                    savedMovies={ savedMovies }
                    setSavedMovies={ setSavedMovies }
                    cardsId={ cardsId }
                    
                />
                }
                { expandButtonState && !shortsChecked ?  <ExpandButton handleUpdateVisibleMovies={ handleUpdateVisibleMovies }></ExpandButton> : '' }
            </main>
            <Footer />
        </>
    );
}

export default Movies;