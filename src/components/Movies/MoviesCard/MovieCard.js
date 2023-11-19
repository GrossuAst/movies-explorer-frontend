import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';
import { mainApi } from '../../../utils/MainApi';

function MovieCard({ movie, image, duration, title, isLiked, setSavedMovies, savedMovies, _id, isSaved }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';

  const isLikedInitially = savedMovies.some((m) => m.movieId === movie.id);
  const [liked, setLiked] = React.useState(isLikedInitially);

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
      image: `${BASE_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    try {
      if (!liked) {
        await mainApi.saveMovie(movieData)
          .then(() => { 
            setLiked(true)
            mainApi.getAllSavedMovies()
            .then((res) => {
              setSavedMovies(res)
            })
            .catch((err) => {console.log(err)})
          })
          .catch((err) => {console.log(err)})
      } else {
        const movieToDelete = savedMovies.find((m) => m.movieId === movie.id);
        await mainApi.deleteMovie(movieToDelete._id)
          .then(() => {
            setLiked(false)
            mainApi.getAllSavedMovies()
              .then((res) => {
                setSavedMovies(res);
              })
              .catch((err) => {console.log(err)})
          })
          .catch((err) => {console.log(err)})
      }
    } catch (err) {
      console.log(err);
    }
  };

  function deleteMovie() {
    // mainApi.deleteMovie(movie.movieId)
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const moviToDelete = movie;
        setSavedMovies(savedMovies.filter((movie) => movie !== moviToDelete));
      })
      .catch((err) => {
        console.log(err);
      })
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