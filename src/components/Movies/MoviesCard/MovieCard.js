import './MovieCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { BASE_URL } from '../../../utils/constants';
import { mainApi } from '../../../utils/MainApi';

function MovieCard({ movie, image, duration, title, isLiked, setSavedMovies, savedMovies, _id, isSaved, handleDeleteMovie, handleUpdateSavedMovies }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';

  // console.log(isLiked);

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
      if (!isLiked) {
        await mainApi.saveMovie(movieData)
          .then((card) => {
            // console.log(card.data)
            const newArray = [...savedMovies, card.data];
            setSavedMovies(newArray);
          })
          .catch((err) => {console.log(err)})
      } else if(isLiked) {
        const movieToDelete = savedMovies.filter((i) => i.movieId === movie.id)[0]._id;
        // console.log(movieToDelete)
        await mainApi.deleteMovie(movieToDelete)
          .then((data) => {
            console.log(data);
            const newArray = savedMovies.filter((i) => i._id !== data._id);
            setSavedMovies(newArray);
            console.log(newArray);
            // тоже рабочий способ
            // const updatedArray = [...savedMovies];
            // const indexToDelete = updatedArray.findIndex((i) => i._id === data._id);
            // if (indexToDelete !== -1) {
            //   updatedArray.splice(indexToDelete, 1);
            //   setSavedMovies(updatedArray);
            // }
          })
          .catch((err) => {console.log(err)})
      }
    } catch (err) {
      console.log(err);
    }
  };

  function deleteMovie() {

    // console.log('delete movie');

    mainApi.deleteMovie(movie._id)
      .then((res) => {
        console.log(res);
        const moviToDelete = movie;
        const arr = savedMovies.filter((movie) => movie !== moviToDelete);
        handleUpdateSavedMovies(arr);
        // const updatedArr = savedMovies.filter((m) => m._id !== movie._id);
        // console.log(updatedArr)
        // handleUpdateSavedMovies()
      })

    // handleDeleteMovie(movie._id);

    // // код приводит к ререндеру компонента SavedMovies
    // mainApi.deleteMovie(movie._id)
    //   .then((card) => {
    //     // console.log(card)
    //     // const moviToDelete = movie;
    // //     setSavedMovies(savedMovies.filter((movie) => movie !== moviToDelete));
    //     const movies = savedMovies.filter((movie) => movie._id !== card._id);
    //     setSavedMovies(movies);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
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