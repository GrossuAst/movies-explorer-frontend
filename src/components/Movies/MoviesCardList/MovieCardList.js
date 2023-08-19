import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';

function MovieCardList({moviesArray, filtredArray, visibleMovies}) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            <ul className='movie-block__list'>

              {/* в зависимости от адреса movies/saved-movies рендерит соответствующий массив */}
              { isMoviesPage ? filtredArray.slice(0, visibleMovies).map((movie) => (
                <li key={movie.id} className='movie-block__card'>
                  <MovieCard
                    movie={movie}
                    image={`${BASE_URL}${movie.image.url}`}
                    duration={movie.duration}
                    title={movie.title}
                  />
                </li>
              )) 
              :
              filtredArray.map((movie) => (
                <li key={movie.id} className='movie-block__card'>
                  <MovieCard
                    title={movie.title}
                    duration={movie.duration}
                    image={movie.image}
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