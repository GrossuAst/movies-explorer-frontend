import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';

import { mainApi } from '../../../utils/MainApi';

function MovieCardList({ filtredArray, moviesArray, savedArray, visibleMovies }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSvaedMoviesPage = location.pathname === '/saved-movies';

  console.log(savedArray)

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            <ul className='movie-block__list'>

              {/* в зависимости от адреса movies/saved-movies рендерит соответствующий массив */}
              { isMoviesPage ? filtredArray.slice(0, visibleMovies).map((movie) => (
                <li key={movie.id} className='movie-block__card'>
                  <MovieCard
                    movie={ movie }
                    title={ movie.title }
                    image={ `${ BASE_URL }${ movie.image.url }` }
                    duration={ movie.duration }
                  />
                </li>
              )) 
              :
              savedArray.map((movie) => (
                <li key={movie._id} className='movie-block__card'>
                  <MovieCard
                    movie={ movie }
                    title={ movie.title }
                    image={ movie.image }
                    duration={ movie.duration }
                  />
                </li>
              )) }
            </ul>
          </div>
        </section>
    </>
  );
}

export default MovieCardList;