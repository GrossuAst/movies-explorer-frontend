import React from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import Switch from '../../Switch/Switch';

import { moviesApi } from '../../../utils/MoviesApi';

function SearchForm({
  // начальный массив фильмов
  initialMovies,
  setInitialMovies,
  // стейт чекбокса и его функция
  shortsChecked,
  toggleCheckboxState,
  // фильтр массива
  filterMovies,
  // управление прелоадером
  handleChangeLoadingStatus,

  clearVisibleMoviesState,
  savedArray,
  setSavedMovies,
  initialSavedMovies,

  // может пригодиться
  setShortsChecked,
}) {

  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';
  
  // состояние инпута на странице /movies
  const movieTitleRef = React.useRef('');
  const [inputValue, setInputValue] = React.useState(localStorage.getItem('inputValue') || '');

  // состояние инпута на странице /saved-movies
  const savedMovieTitleRef = React.useRef('');

  function handleSubmitMoviesForm(evt) {
    evt.preventDefault();
    console.log('форма отправлена');
    if(isMoviesPage) {
      
      const name = movieTitleRef.current.value;

      // если поиска еще не было
      if(initialMovies.length === 0) {
        handleChangeLoadingStatus(true);
        moviesApi.getMovies()
          .then((movies) => {
            handleChangeLoadingStatus(false);
            setInitialMovies(movies);
            filterMovies(movies, name);

            localStorage.setItem('inputValue', name);
            localStorage.setItem('initialMovies', JSON.stringify(movies));
          })
      }

      else if(initialMovies.length > 0) {
        const moviesInLocal = JSON.parse(localStorage.getItem('initialMovies'));
        filterMovies(moviesInLocal, name);
        localStorage.setItem('inputValue', name);
      }
    }
  };

  // функция для поиска на странице /saved-movies. Фильтрует изначальный массив и сохраняет его в стейт savedArray
  function handleSearchSavedMovie(evt) {
    if(isSavedMovesPage) {
      evt.preventDefault();
      const currentInputValue = savedMovieTitleRef.current.value;
      const filteredMovies = initialSavedMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(currentInputValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(currentInputValue.toLowerCase())
      );
      setSavedMovies(filteredMovies);
    }
  }

  return (
    <>
        <section className='search-form'>
            <div className='search-form__wrapper'>
              <form className='search-form__form'
                onSubmit={ handleSubmitMoviesForm }
              >
                { isMoviesPage ? (
                  <input className='search-form__input' type={ 'text' } placeholder='Фильм' required name='name' 
                    ref={ movieTitleRef }
                    onChange={ (evt) => { setInputValue(evt.target.value) } }
                    defaultValue={ inputValue }
                  >
                  </input>
                )
                :
                (
                  <input className='search-form__input' type={ 'text' } placeholder='Фильм' required name='name' 
                    ref={ savedMovieTitleRef }
                  >
                  </input>
                )
                }
                <button className='search-form__button' type='submit'></button>
                <div className='search-form__switch-box'>
                  <Switch 
                    shortsChecked={ shortsChecked }
                    toggleCheckboxState={ toggleCheckboxState }                    
                    handleSubmitMoviesForm={ handleSubmitMoviesForm }
                  />
                  <p className='search-form__text'>Короткометражки</p>
                </div>
              </form>
            </div>
        </section>
    </>
  );
}

export default SearchForm;
