import React from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import Switch from '../../Switch/Switch';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import { moviesApi } from '../../../utils/MoviesApi';

import { useFormWithValidation } from '../../../hooks/Validation';

function SearchForm({
  // начальный массив фильмов
  initialMovies,
  setInitialMovies,
  // функция фильтра массива на /movies
  filterMovies,
  // начальный массив сохраненных фильмов
  setSavedMovies,
  initialSavedMovies,

  // стейт чекбокса и его функция, ошибка ответа сервера
  shortsChecked,
  toggleCheckboxState,
  setServerErrorMessage,

  // переключение чекбокса на /saved-movies
  savedMoviesShortsChecked,
  toggleSavedMoviesCheckboxState,
  
  // управление прелоадером
  handleChangeLoadingStatus,

  // clearVisibleMoviesState,
}) {

  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';
  
  // состояние инпута на странице /movies
  const movieTitleRef = React.useRef('');
  const [inputValue, setInputValue] = React.useState(localStorage.getItem('inputValue') || '');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  // состояние инпута на странице /saved-movies
  const savedMovieTitleRef = React.useRef('');

  const { values, setValues, errors, isValid, handleChange, resetForm } = useFormWithValidation({ name: inputValue } || { name: savedMovieTitleRef.current.value });

  function handleSubmitMoviesForm(evt) {
    evt.preventDefault();
    // clearVisibleMoviesState();
    if(values.name.length < 1) {
      setErrorMessage('Нужно ввести ключевое слово');
      return
    } else if(values.name.length > 0) {
      setErrorMessage('');
    }
    setServerErrorMessage(false);
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
            resetForm();
            localStorage.setItem('inputValue', name);
            localStorage.setItem('initialMovies', JSON.stringify(movies));
          })
          .catch((err) => {
            console.log(err);
            setServerErrorMessage(true);
          })
      }

      else if(initialMovies.length > 0) {
        const moviesInLocal = JSON.parse(localStorage.getItem('initialMovies'));
        filterMovies(moviesInLocal, name);
        resetForm()
        localStorage.setItem('inputValue', name);
      }
    }
  };

  // функция для поиска на странице /saved-movies. Фильтрует изначальный массив и сохраняет его в стейт savedMovies
  function handleSearchSavedMovie(evt) {
    evt.preventDefault();
    
    if(isSavedMovesPage) {
      const currentInputValue = savedMovieTitleRef.current.value;
      if(currentInputValue.length < 1) {
        setErrorMessage('Нужно ввести ключевое слово');
        return
      } else if(currentInputValue.length > 0) {
      setErrorMessage('');
      }
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
              {isMoviesPage ? 
                (
                  // форма на роуте /movies
                  <form className='search-form__form' noValidate
                    onSubmit={ handleSubmitMoviesForm }
                  >
                    <input className='search-form__input' type={ 'text' } placeholder='Фильм' required name='name' 
                      ref={ movieTitleRef }
                      // onChange={ (evt) => { setInputValue(evt.target.value) } }
                      onChange={ handleChange }
                      defaultValue={ inputValue }
                    >
                    </input>
                    <button className='search-form__button' type='submit'></button>
                    <ErrorMessage message={ errorMessage }/>
                    <div className='search-form__switch-box'>
                      <Switch 
                        shortsChecked={ shortsChecked }
                        toggleCheckboxState={ toggleCheckboxState }                    
                      />
                      <p className='search-form__text'>Короткометражки</p>
                    </div>
                  </form>
                ) 
              :
              (
                // форма на роуте /saved-movies
                <form className='search-form__form' noValidate
                    onSubmit={ handleSearchSavedMovie }
                  >
                    <input className='search-form__input' type={ 'text' } placeholder='Фильм' required name='name' 
                      onChange={ handleChange }
                      ref={ savedMovieTitleRef }
                    >
                    </input>
                    <button className='search-form__button' type='submit'></button>
                    <ErrorMessage message={ errorMessage } />
                    <div className='search-form__switch-box'>
                      <Switch 
                        savedMoviesShortsChecked={ savedMoviesShortsChecked }
                        toggleSavedMoviesCheckboxState={ toggleSavedMoviesCheckboxState }
                      />
                      <p className='search-form__text'>Короткометражки</p>
                    </div>
                  </form>
              )
              }
            </div>
        </section>
    </>
  );
}

export default SearchForm;
