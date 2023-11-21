import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import Preloader from '../../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';

import { mainApi } from '../../../utils/MainApi';

function MovieCardList({
  moviesToShow,
  
  shortsChecked,
  savedMoviesShortsChecked,
  
  savedMovies,
  setSavedMovies,
  initialSavedMovies,
  isMoviesToShowEmpty,
   
  visibleMovies, 
  isLoading, 
  
  roundedVisibleCardCount,
}) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            { isMoviesPage ? ( !isMoviesToShowEmpty ?
            // роут /movies
              <ul className='movie-block__list'>
                { isMoviesPage && isLoading ? <Preloader /> : moviesToShow.filter((m) => {
                  if(shortsChecked) {
                    return m.duration <= 40;
                  } else { return m }
                })
                .slice(0, roundedVisibleCardCount).map((movie) => (
                    <li key={movie.id} className='movie-block__card'>
                      <MovieCard
                        // isLiked={ isMovieSaved(savedMovies, movie) }
                        movie={ movie }
                        title={ movie.title }
                        image={ `${ BASE_URL }${ movie.image.url }` }
                        duration={ movie.duration }
                        isLiked={ Array.isArray(savedMovies) && savedMovies.find(savedMovie => savedMovie.movieId === movie.id) }
                        setSavedMovies={ setSavedMovies }
                        savedMovies={ savedMovies }
                        // _id={ movie._id }
                      />
                    </li>
                  ))
                }
              </ul> : 
              <p className='movie-block__no-result'>Ничего не найденно</p>
            ) : 
            // роут /saved-movies
            <ul className='movie-block__list'>
              { Array.isArray(savedMovies) && savedMovies.filter((m) => {
                if(savedMoviesShortsChecked) {
                  return m.duration <= 40;
                } else { return m}
              })
              .map((movie) => (
                <li key={movie.movieId} className='movie-block__card'>
                  <MovieCard
                    // isLiked={ isMovieSaved(savedMovies, movie) }
                    movie={ movie }
                    title={ movie.title }
                    image={ movie.image }
                    duration={ movie.duration }
                    setSavedMovies={ setSavedMovies }
                    savedMovies={ savedMovies }
                    _id={ movie._id }
                    isLiked={ Array.isArray(savedMovies) && savedMovies.find(savedMovie => savedMovie.movieId === movie.id) }
                  />
                </li>
              )) }
              {/* { Array.isArray(savedMovies) && savedMovies.filter((m) => {
                if(savedMoviesShortsChecked) {
                  return m.duration <= 40;
                } else { return m }
              })
              .map((movie) => (
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
              )) } */}
            </ul> }
          </div>
        </section>
    </>
  );
}

export default MovieCardList;