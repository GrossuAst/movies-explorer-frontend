import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';
import { mainApi } from '../../../utils/MainApi';

function MovieCard({ 
  movie,
  image, 
  duration, 
  title, isLiked, 
  setSavedMovies, 
  savedMovies, 
  _id, 
  isSaved, 

  handleUpdateSavedMovies, 
  handleSaveMovie,
  handleDeleteMovie,
}) {

  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';

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

  function switchLike() {
    try {
      if (!isLiked) {
        handleSaveMovie(movie);
      } else if(isLiked) {
        // const movieToDelete = savedMovies.filter((i) => i.movieId === movie.id)[0]._id;
        // console.log(savedMovies.find((i) => i.movieId === movie.id)._id)
        const movieToDelete = savedMovies.find((i) => i.movieId === movie.id)._id;
        handleDeleteMovie(movieToDelete);
      };
    } catch (err) {
      console.log(err);
    };
  };

  function deleteMovie() {
    handleDeleteMovie(movie._id);
  };

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
                    <div className={ isLiked ? 'card__like card__like_active' : 'card__like' }
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