import React from 'react';
import { Routes, Route } from 'react-router-dom';

// массивы для теста
import { movies, savedMovies } from '../../utils/constants';

import './App.css';
import MainPage from '../Main/MainPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Preloader from '../Preloader/Preloader';

function App() {
  // если стейт false, header рендерит компонент для регистрации/логина
  // если стейт true, header рендерит навигацию по страницам movies/saved-movies
  const [isLoggedIn, setLoggedIn] = React.useState(true);

  return (
    <>
      <Routes>
        {/* главная страница */}
        <Route 
          path='/' 
          element={<MainPage isLoggedIn={isLoggedIn}/>}
        />

        {/* страница с фильмами */}
        <Route path='/movies' element={<Movies movies={movies} />}/>

        {/* страница с сохраненными фильмами */}
        <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} />}/>

        {/* страница профиля */}
        <Route path='/profile' element={<Profile />} />

        {/* страница логина */}
        <Route path='/signin' element={<Login />}/>

        {/* страница регистрации */}
        <Route path='/signup' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
