import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import Preloader from '../../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';

import { mainApi } from '../../../utils/MainApi';

function MovieCardList({
  shortsChecked,
  moviesToShow,

  initialMovies,
  savedArray, 
  visibleMovies, 
  isLoading, 
  setSavedMovies, 
  savedMoviesToShow,
}) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSvaedMoviesPage = location.pathname === '/saved-movies';

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            { isMoviesPage ? ( moviesToShow.length > 0 ?
              <ul className='movie-block__list'>
                { isMoviesPage && isLoading ? <Preloader /> : moviesToShow.filter((m) => {
                  if(shortsChecked) {
                    return m.duration <= 20;
                  } else { return m }
                })
                .slice(0, visibleMovies).map((movie) => (
                    <li key={movie.id} className='movie-block__card'>
                      <MovieCard
                        movie={ movie }
                        title={ movie.title }
                        image={ `${ BASE_URL }${ movie.image.url }` }
                        duration={ movie.duration }
                        isLiked={ Array.isArray(savedArray) && savedArray.some(savedMovie => savedMovie.movieId === movie.id) }
                        setSavedMovies={ setSavedMovies }
                        savedArray={ savedArray }
                      />
                    </li>
                  ))
                }
              </ul> : 
              <p>Ничего не найденно</p>
            ) : 
            <ul className='movie-block__list'>
              { Array.isArray(savedArray) && savedArray.map((movie) => (
                <li key={movie.movieId} className='movie-block__card'>
                  <MovieCard
                    movie={ movie }
                    title={ movie.title }
                    image={ movie.image }
                    duration={ movie.duration }
                    setSavedMovies={ setSavedMovies }
                    savedArray={ savedArray }
                    isLiked={ Array.isArray(savedArray) && savedArray.some(savedMovie => savedMovie.movieId === movie.id) }
                  />
                </li>
              )) }
            </ul> }
          </div>
        </section>
    </>
  );
}

export default MovieCardList;