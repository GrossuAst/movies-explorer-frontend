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

  // исходный массив с фильмами___________________________________________
  const [moviesArray, setMoviesArray] = React.useState([]);
  // отвфильтрованный массив, передается в компонент MovieCardList для рендера
  const [filtredArray, setFiltredArray] = React.useState([]);

  React.useEffect(() => {
    moviesApi.getMovies()
    .then((res) => {
      setMoviesArray(res);
    })
  }, []);

  // функция для изменения стейта отфильтрованного массива
  function filterArray(filtredArray) {
    setFiltredArray(filtredArray);
  }

  // управление прелоадером
  let isLoading;

  // управление кол-вом отображаемых карточек
  const [visibleMovies, setVisibleMovies] = React.useState(0);

  // статичное отображение. Разное количество для разных экранов рендерится только при перезагрузке
  React.useEffect(() => {
    if (window.innerWidth < 468) {
      setVisibleMovies(5);
    }
    if (window.innerWidth > 467 && window.innerWidth < 866) {
      setVisibleMovies(8);
    }
    if (window.innerWidth > 865) {
      setVisibleMovies(12);
    }
    console.log(visibleMovies)
  }, []);

  // увеличение кол-ва карточек при клике на кнопку Еще
  // Math.min гарантирует, что стейт visibleMovies не будет больше чем длина массива filtredArray
  function handleUpdateVisibleMovies() {
    if (window.innerWidth < 468) {
      setVisibleMovies(Math.min(visibleMovies + 5, filtredArray.length));
    }
    if (window.innerWidth > 467 && window.innerWidth < 866) {
      setVisibleMovies(Math.min(visibleMovies + 8, filtredArray.length));
    }
    if (window.innerWidth > 865) {
      setVisibleMovies(Math.min(visibleMovies + 12, filtredArray.length));
    }
  }


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
        <Route path='/movies' 
          element={ <Movies
            moviesArray={moviesArray}
            // функция для изменения стейта отфильтрованного массива, прокидывается в компонент поисковика
            filterArray={filterArray}
            filtredArray={filtredArray}
            visibleMovies={visibleMovies}
            handleUpdateVisibleMovies={handleUpdateVisibleMovies}
            // управление сайдбаром, прокидывается в компонент Movies и вешается на кнопку
            openSidebar={openSidebar}
          /> } 
        />

        {/* страница с сохраненными фильмами */}
        <Route path='/saved-movies' element={<SavedMovies filtredArray={filtredArray}
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
