import React from 'react';

import './SearchForm.css';
import Switch from '../../Switch/Switch';

function SearchForm({ moviesArray, filterArray, clearVisibleMoviesState }) {

  const movieTitleRef = React.useRef();

  // хэндлер формы
  function handleSubmit(evt) {
    evt.preventDefault();
    clearVisibleMoviesState();
    console.log(moviesArray + 'исходный массив');
    // console.log(movieTitleRef.current.value);
    // отфильтрованный массив, не зависит от регистра
    const filtredArray = moviesArray.filter(
      movie => movie.nameRU.toLowerCase().includes(movieTitleRef.current.value) 
      || movie.nameEN.toLowerCase().includes(movieTitleRef.current.value)
    );
    filterArray(filtredArray);
    localStorage.setItem('inputValue', movieTitleRef.current.value);
    localStorage.setItem('filtredArray', JSON.stringify(filtredArray));
    console.log(filtredArray);
  }

  return (
    <>
        <section className='search-form'>
            <div className='search-form__wrapper'>
              <form className='search-form__form' onSubmit={handleSubmit}>
                <input className='search-form__input' type={'text'} placeholder='Фильм' required name='name' 
                  ref={movieTitleRef} 
                  defaultValue={localStorage.getItem('inputValue') ? localStorage.getItem('inputValue') : ''} > 
                </input>
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
