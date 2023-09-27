import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import Preloader from '../../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';

import { mainApi } from '../../../utils/MainApi';

function MovieCardList({ filtredArray, moviesArray, savedArray, visibleMovies, isLoading }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSvaedMoviesPage = location.pathname === '/saved-movies';

  console.log(savedArray);
  console.log(filtredArray);
  // const isLiked = savedArray.some(savedMovie => savedMovie._id === movie.id);

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            { isMoviesPage ? ( filtredArray.length > 0 ?
              <ul className='movie-block__list'>
                { isMoviesPage && isLoading ? <Preloader></Preloader> : filtredArray.slice(0, visibleMovies).map((movie) => (
                    <li key={movie.id} className='movie-block__card'>
                      <MovieCard
                        movie={ movie }
                        title={ movie.title }
                        image={ `${ BASE_URL }${ movie.image.url }` }
                        duration={ movie.duration }
                        isLiked={ savedArray.some(savedMovie => savedMovie.movieId === movie.id) }
                      />
                    </li>
                  )) 
                  }
              </ul> : 
              <p>Ничего не найденно</p>
            ) : 
            <ul className='movie-block__list'>
              { savedArray.map((movie) => (
                <li key={movie.movieId} className='movie-block__card'>
                  <MovieCard
                    movie={ movie }
                    title={ movie.title }
                    image={ movie.image }
                    duration={ movie.duration }
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