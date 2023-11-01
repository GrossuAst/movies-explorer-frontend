import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';
import { mainApi } from '../../../utils/MainApi';

function MovieCard({ movie, image, duration, title, isLiked, setSavedMovies, savedMovies }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';

  // console.log(savedMovies);
  // console.log(mongoId);

  const [liked, setLiked] = React.useState(isLiked);

  // принимает минуты и конвертирует в формат чч:мм
  function convertDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  // открытие трейлера фильма в новом окне
  function linkClick(evt) {
    if(!evt.target.classList.contains('card__like') && !evt.target.classList.contains('card__delete-button')) {
      window.open(movie.trailerLink, '_blank');
    }
  };

  async function switchLike() {
    const movieData = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${ BASE_URL }${ movie.image.url }`,
      trailerLink: movie.trailerLink,
      thumbnail: `${ BASE_URL }${ movie.image.formats.thumbnail.url }`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }
    try {
      if (!liked) {
        await mainApi.saveMovie(movieData);
        setLiked(true);
        setSavedMovies([...savedMovies, movieData]);
      } else {
        await mainApi.deleteMovie(movie.id);
        setLiked(false);
        setSavedMovies(savedMovies.filter(savedMovie => savedMovie.movieId !== movie.id));
      }
    } catch (err) {
      console.log(err);
    }
  }

  function deleteMovie() {
    mainApi.deleteMovie(movie.movieId)
      .then(() => {
        const moviToDelete = movie;
        setSavedMovies(savedMovies.filter((movie) => movie !== moviToDelete));
      })
  }

  return (
    <>
        <article className='card' onClick={ linkClick }>
            <img className='card__image' alt={ `Превью фильма '${ movie.nameRU }'` } src={ image }></img>
            <div className='card__descriprion'>
                <div>
                    <h2 className='card__title'>{ movie.nameRU }</h2>
                    <p className='card__duration'>{ convertDuration(duration) }</p>
                </div>
                { 
                  isSavedMovesPage ?
                  ( 
                    <div className='card__delete-button'
                      onClick={ deleteMovie }
                    >
                    </div>
                  ) 
                  : 
                  (
                    <div className={ liked ? 'card__like card__like_active' : 'card__like' }
                      onClick={ switchLike }
                    >
                    </div>
                  )
                }
            </div>
        </article>
    </>
  );
}

export default MovieCard;