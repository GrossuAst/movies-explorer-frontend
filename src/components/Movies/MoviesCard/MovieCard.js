import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MovieCard({image, duration, title}) {
  const location = useLocation();
  const isSavedMovesPage = location.pathname === '/saved-movies';

  return (
    <>
        <article className='card'>
            <img className='card__image' alt={`Превью фильма '${title}'`} src={image}></img>
            <div className='card__descriprion'>
                <div>
                    <h2 className='card__title'>{title}</h2>
                    <p className='card__duration'>{duration}</p>
                </div>
                <div className={isSavedMovesPage ? 'card__delete-button' : 'card__like'}></div>
            </div>
        </article>
    </>
  );
}

export default MovieCard;