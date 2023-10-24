import React from 'react';
import { useLocation } from 'react-router-dom';

import './Switch.css';

// import { MainApi } from '../../utils/MainApi';
// import { moviesApi } from '../../utils/MoviesApi';

function Switch({
    shortsChecked, 
    setShortsChecked, 
    handleSubmit,
    toggleCheckboxState,
    filterMoviesToShow,
    handleSearchMovies,
    initialMovies,
    handleSubmitMoviesForm,
    // movieTitleRef,
}) {

    const location = useLocation();
    const isMoviesPage = location.pathname === '/movies';
    // const isSavedMovesPage = location.pathname === '/saved-movies';

    function searchByCheckbox(evt) {
        toggleCheckboxState();
        handleSubmitMoviesForm(evt);
    };

    // console.log(shortsChecked);

    return (
        isMoviesPage ? 
        (<div className='wrap'>
            <input type='checkbox' id='slider-point' 
                checked={ shortsChecked }
                onChange={ searchByCheckbox }
            />
            <label className='wrap__slider' htmlFor='slider-point' type='submit' ></label>
        </div>)
        :
        (<div className='wrap'>
            <input type='checkbox' id='slider-point' 
            />
            <label className='wrap__slider' htmlFor='slider-point' type='submit' ></label>
        </div>)
    )
}

export default Switch;
