import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MovieCard({movie, image, duration, title}) {
  const location = useLocation();
  const isSavedMovesPage = location.pathname === '/saved-movies';

  // принимает минуты и конвертирует в формат чч:мм
  function convertDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  // открытие трейлера фильма в новом окне
  function linkClick(evt) {
    if(!evt.target.classList.contains('card__like')) {
      window.open(movie.trailerLink, '_blank');
    }
  }

  return (
    <>
        <article className='card' onClick={linkClick}>
            <img className='card__image' alt={`Превью фильма '${movie.nameRU}'`} src={image}></img>
            <div className='card__descriprion'>
                <div>
                    <h2 className='card__title'>{movie.nameRU}</h2>
                    <p className='card__duration'>{convertDuration(duration)}</p>
                </div>
                <div className={isSavedMovesPage ? 'card__delete-button' : 'card__like'}></div>
            </div>
        </article>
    </>
  );
}

export default MovieCard;