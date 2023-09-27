import React from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import Switch from '../../Switch/Switch';

import { moviesApi } from '../../../utils/MoviesApi';

function SearchForm({ 
  moviesArray, 
  filterArray,
  clearVisibleMoviesState,
  // searchMovies,
  setMoviesArray,
  handleChangeLoadingStatus,
}) {

  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  
  const movieTitleRef = React.useRef('');
  const [inputValue, setInputValue] = React.useState(localStorage.getItem('inputValue') || '');

  const savedMovieTitleRef = React.useRef('');

  function handleMoviesArrayChange(data) {
    setMoviesArray(data);
  };

  React.useEffect(() => {
    console.log(movieTitleRef);
  }, [inputValue]);

  // хэндлер формы
  function handleSubmit(evt) {
    evt.preventDefault();
    const currentInputValue = movieTitleRef.current.value;
    console.log(currentInputValue);
    if(moviesArray.length === 0) {
      handleChangeLoadingStatus(true);
      moviesApi.getMovies()
        .then((data) => {
          handleMoviesArrayChange(data);
          const filtredArray = data.filter(
            movie => movie.nameRU.toLowerCase().includes(currentInputValue.toLowerCase()) 
            || movie.nameEN.toLowerCase().includes(currentInputValue.toLowerCase())
          );
          filterArray(filtredArray);
          
          localStorage.setItem('inputValue', currentInputValue);
          localStorage.setItem('filtredArray', JSON.stringify(filtredArray));
          
          handleChangeLoadingStatus(false);
        })
        .catch((err) => { 
          console.log(err) 
          console.log(movieTitleRef)
          handleChangeLoadingStatus(false);
        })
    } else if(moviesArray.length > 0) {
      const filtredArray = moviesArray.filter(
        movie => movie.nameRU.toLowerCase().includes(currentInputValue.toLowerCase()) 
        || movie.nameEN.toLowerCase().includes(currentInputValue.toLowerCase())
      );
      filterArray(filtredArray);
      localStorage.setItem('inputValue', currentInputValue);
      localStorage.setItem('filtredArray', JSON.stringify(filtredArray));
    }
  }

  return (
    <>
        <section className='search-form'>
            <div className='search-form__wrapper'>
              <form className='search-form__form'
                onSubmit={ handleSubmit }
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
                    // onChange={ (evt) => { setInputValue(evt.target.value) } }
                    // defaultValue={ inputValue }
                  >
                  </input>
                )
                }
                <button className='search-form__button' type='submit'></button>
                <div className='search-form__switch-box'>
                  <Switch></Switch>
                  <p className='search-form__text'>Короткометражки</p>
                </div>
              </form>
            </div>
        </section>
    </>
  );
}

export default SearchForm;
