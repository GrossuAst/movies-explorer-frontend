import React from 'react';
import { Routes, Route } from 'react-router-dom';

// массивы для теста
import { movies, savedMovies } from '../../utils/constants';

// импорт компонентов________________________________________
import './App.css';
import MainPage from '../Main/MainPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Preloader from '../Preloader/Preloader';
import Sidebar from '../Sidebar/Sidebar';

// импорт API
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

function App() {
  
  // если стейт false, header рендерит компонент для регистрации/логина
  // если стейт true, header рендерит навигацию по страницам movies/saved-movies
  const [isLoggedIn, setLoggedIn] = React.useState(true);

  // управление сайдбаром_______________________________________
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  };

  function closeSidebar() {
    setSidebarOpen(false);
  };

  // массив с фильмами___________________________________________
  const [moviesArray, setMoviesArray] = React.useState(null);

  React.useEffect(() => {
    moviesApi.getMovies()
    .then((res) => {
      setMoviesArray(res);
    })
  }, []);

  React.useEffect(() => {
    if(moviesArray !== null) {
      console.log(moviesArray);
    }
  }, [moviesArray]);

  return (
    <>
      <Routes>
        {/* главная страница */}
        <Route 
          path='/' 
          element={<MainPage isLoggedIn={isLoggedIn}
          // управление сайдбаром, прокидывается в компонент MainPage и HeaderNavigate для открытия по клику
          openSidebar={openSidebar}
          />}
        />

        {/* страница с фильмами */}
        <Route path='/movies' element={<Movies moviesArray={moviesArray ? moviesArray : movies}
          // управление сайдбаром, прокидывается в компонент Movies и вешается на кнопку
          openSidebar={openSidebar}
          />} 
        />

        {/* страница с сохраненными фильмами */}
        <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies}
        // управление сайдбаром, прокидывается в компонент SavedMovies и вешается на кнопку
          openSidebar={openSidebar}
          />} 
        />

        {/* страница профиля */}
        <Route path='/profile' element={<Profile 
          openSidebar={openSidebar}
          />}
        />

        {/* страница логина */}
        <Route path='/signin' element={<Login />}/>

        {/* страница регистрации */}
        <Route path='/signup' element={<Register />}/>

        <Route path='*' element={<NotFoundPage/>}/>

      </Routes>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar}></Sidebar>
    </>
  );
}

export default App;
