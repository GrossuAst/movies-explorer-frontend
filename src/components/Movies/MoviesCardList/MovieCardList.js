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

  isMoviesToShowEmpty,

  initialMovies,
  savedMovies, 
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
            { isMoviesPage ? ( !isMoviesToShowEmpty ?
              <ul className='movie-block__list'>
                { isMoviesPage && isLoading ? <Preloader /> : moviesToShow.filter((m) => {
                  if(shortsChecked) {
                    return m.duration <= 40;
                  } else { return m }
                })
                .slice(0, visibleMovies).map((movie) => (
                    <li key={movie.id} className='movie-block__card'>
                      <MovieCard
                        movie={ movie }
                        title={ movie.title }
                        image={ `${ BASE_URL }${ movie.image.url }` }
                        duration={ movie.duration }
                        isLiked={ Array.isArray(savedMovies) && savedMovies.find(savedMovie => savedMovie.movieId === movie.id) }
                        setSavedMovies={ setSavedMovies }
                        savedMovies={ savedMovies }
                      />
                    </li>
                  ))
                }
              </ul> : 
              <p className='movie-block__no-result'>Ничего не найденно</p>
            ) : 
            <ul className='movie-block__list'>
              { Array.isArray(savedMovies) && savedMovies.map((movie) => (
                <li key={movie.movieId} className='movie-block__card'>
                  <MovieCard
                    movie={ movie }
                    title={ movie.title }
                    image={ movie.image }
                    duration={ movie.duration }
                    setSavedMovies={ setSavedMovies }
                    savedMovies={ savedMovies }
                    isLiked={ Array.isArray(savedMovies) && savedMovies.find(savedMovie => savedMovie.movieId === movie.id) }
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