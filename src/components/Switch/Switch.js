import React from 'react';
import { useLocation } from 'react-router-dom';

import './Switch.css';

function Switch({
    // стейт чекбокса и функция изменения
    shortsChecked, 
    toggleCheckboxState,
    savedMoviesShortsChecked,
    toggleSavedMoviesCheckboxState,
}) {

    const location = useLocation();
    const isMoviesPage = location.pathname === '/movies';
    // const isSavedMovesPage = location.pathname === '/saved-movies';

    return (
        isMoviesPage ? 
        (<div className='wrap'>
            <input type='checkbox' id='slider-point' 
                checked={ shortsChecked }
                onChange={ toggleCheckboxState }
            />
            <label className='wrap__slider' htmlFor='slider-point' type='submit' ></label>
        </div>)
        :
        (<div className='wrap'>
            <input type='checkbox' id='slider-point' 
                checked={ savedMoviesShortsChecked }
                onChange={ toggleSavedMoviesCheckboxState }
            />
            <label className='wrap__slider' htmlFor='slider-point' type='submit' ></label>
        </div>)
    )
}

export default Switch;
