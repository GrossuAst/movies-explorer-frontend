import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// массивы для теста
import { movies, savedMovies } from '../../utils/constants';

import { CurrentUserContext } from '../contexts/CurrentUser';
import ProtectedRoute from '../ProtectedRoute';

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

  const navigate = useNavigate();
  
  // если стейт false, header рендерит компонент для регистрации/логина
  // если стейт true, header рендерит навигацию по страницам movies/saved-movies
  const [isLoggedIn, setLoggedIn] = React.useState(false);

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
  // стейт пользователя
  const [userData, setUserData] = React.useState({});
  // отфильтрованный массив, передается в компонент MovieCardList для рендера
  const [filtredArray, setFiltredArray] = React.useState([]);

  // React.useEffect(() => {
  //   moviesApi.getMovies()
  //   .then((res) => {
  //     setMoviesArray(res);
  //   })
  // }, []);

  React.useEffect(() => {
    if(isLoggedIn === true) {
    Promise.all([moviesApi.getMovies(), mainApi.getInfoAboutUser()])
    .then(([movies, user]) => {
      setMoviesArray(movies);
      setUserData(user);
      // console.log(user)
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })};
    return;
  }, [isLoggedIn]);

  // функция для изменения стейта отфильтрованного массива
  function filterArray(filtredArray) {
    setFiltredArray(filtredArray);
  };

  // при монтировании проверяет localStorage. Если предыдущий поиск в нем сохранен, рендерит его
  React.useEffect(() => {
    if(localStorage.getItem('filtredArray')) {
      setFiltredArray(JSON.parse(localStorage.getItem('filtredArray')));
      // console.log(JSON.parse(localStorage.getItem('filtredArray')))
    }
  }, []);

  // управление прелоадером
  const [isLoading, setIsLoading] = React.useState(true);

  // управление кол-вом отображаемых карточек
  const [visibleMovies, setVisibleMovies] = React.useState(0);

  // прокидывается в компонент SearchForm для обнуления стейта при каждом сабмите формы
  function clearVisibleMoviesState() {
    if(isMobile) {
      setVisibleMovies(5);
    }
    if(isTablet) {
      setVisibleMovies(8);
    }
    if(isDesktop) {
      setVisibleMovies(12);
    }
  };

  const isMobile = window.innerWidth < 468;
  const isTablet = window.innerWidth > 467 && window.innerWidth < 1280;
  const isDesktop = window.innerWidth > 1279;

  // при монтировании рендерит кол-во карточек в зависимости от ширины экрана
  React.useEffect(() => {
    if (isMobile) {
      setVisibleMovies(5);
    }
    if (isTablet) {
      setVisibleMovies(8);
    }
    if (isDesktop) {
      setVisibleMovies(12);
    }
    console.log(visibleMovies)
  }, []);

  // увеличение кол-ва карточек при клике на кнопку Еще
  // Math.min гарантирует, что стейт visibleMovies не будет больше чем длина массива filtredArray
  function handleUpdateVisibleMovies() {
    if (isMobile) {
      setVisibleMovies(Math.min(visibleMovies + 1, filtredArray.length));
    }
    if (isTablet) {
      setVisibleMovies(Math.min(visibleMovies + 2, filtredArray.length));
    }
    if (isDesktop) {
      setVisibleMovies(Math.min(visibleMovies + 3, filtredArray.length));
    }
  };

  // отслеживание изменения ширины экрана
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  function resize() {
    setWindowSize(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setTimeout(resize, 1000);
    })
  }, []);

  // проверка токена и автоматичексий запрос данных
  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    mainApi.getInfoAboutUser()
      .then((data) => {
        if(data) {
          setUserData(data);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        } else {
          setLoggedIn(false);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setLoggedIn(false);
      })
  };

  // функция логаута, делает запрос на удаление куки и удаляет данные из localStorage
  function clearCookies() {
    mainApi.logout()
      .then((res) => {
        setLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.clear();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      })
  }

  // обновление данных профиля
  function handleUpdateProfile({ email, name }) {
  mainApi.updateProfile( {email, name} )
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      })
  }

  return (
    <>
      <CurrentUserContext.Provider value={ userData }>
        <Routes>
          {/* главная страница */}
          <Route 
            path='/' 
            element={<MainPage isLoggedIn={ isLoggedIn }
            // управление сайдбаром, прокидывается в компонент MainPage и HeaderNavigate для открытия по клику
            openSidebar={ openSidebar }
            />}
          />

          {/* страница с фильмами, защищена авторизацией */}
          <Route path='/movies' 
            element={ 
              <ProtectedRoute isLoggedIn={ isLoggedIn }
                element={ () =>
                  <Movies
                    moviesArray={ moviesArray }
                    // функция для изменения стейта отфильтрованного массива, прокидывается в компонент поисковика
                    filterArray={ filterArray }
                    filtredArray={ filtredArray }
                    visibleMovies={ visibleMovies }
                    handleUpdateVisibleMovies={ handleUpdateVisibleMovies }
                    clearVisibleMoviesState={ clearVisibleMoviesState }
                    openSidebar={ openSidebar }
                  /> 
                }
              />
            }
          />

          {/* страница с сохраненными фильмами, защищена авторизацией */}
          <Route path='/saved-movies' 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}
                element={ () => 
                  <SavedMovies 
                    filtredArray={ filtredArray }
                    openSidebar={ openSidebar }
                  />
                }
              />
            }
          />

          {/* страница профиля, защищена авторизацией */}
          <Route path='/profile' 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}
                element={ () => 
                  <Profile
                    userData={ userData }
                    clearCookies={ clearCookies }
                    // setUserData={ setUserData }
                    handleUpdateProfile={handleUpdateProfile}
                    openSidebar={ openSidebar }
                  />
                }
              />
            }
          />

          {/* страница логина */}
          <Route path='/signin' element={ 
            <Login 
              setUserData={ setUserData } 
              setLoggedIn={ setLoggedIn }
            /> }
          />

          {/* страница регистрации */}
          <Route path='/signup' element={
            <Register /> }
          />

          <Route path='*' element={ <NotFoundPage/> }/>

        </Routes>
      </CurrentUserContext.Provider>
      <Sidebar isSidebarOpen={ isSidebarOpen } closeSidebar={ closeSidebar }></Sidebar>
    </>
  );
}

export default App;
