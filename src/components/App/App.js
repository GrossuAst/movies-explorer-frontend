import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const isSavedMovesPage = location.pathname === '/saved-movies';

  // получение состояния чекбокса при первой загрузке
  const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) === null ? false : JSON.parse(localStorage.getItem('checkboxState'));
  // const isMoviesToShowEmptyState = localStorage.getItem('moviesToShow') && JSON.parse(localStorage.getItem('moviesToShow')).length > 0 ? false : true;
  
  // залогинен ли пользователь, его данные *
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});

  // управление сайдбаром, прелоадером *
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // исходный массив с фильмами и массив для рендера *
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);

  // исходный массив сохраненных фильмов, массив сохраненных фильмов для рендера *
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  // состояние чекбокса короткометражек на /movies и /saved-movies *
  const [shortsChecked, setShortsChecked] = React.useState(checkboxState);
  const [savedMoviesShortsChecked, setSavedMoviesShortsChecked] = React.useState(false);

  // ответ с ошибкой от сервера, ответ 'ничего не найдено', кол-во отображаемых карточек *
  const [serverErrorMessage, setServerErrorMessage] = React.useState(false);
  const [isMoviesToShowEmpty, setIsMoviesToShowEmpty] = React.useState(false);
  const [visibleMovies, setVisibleMovies] = React.useState(0);

  // попап успешного обновления профиля
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  // сброс стейтов
  function resetStates() {
    setSavedMovies(initialSavedMovies);
    setSavedMoviesShortsChecked(false);
  };

  // useEffect для сброса состояния при покидании saved-movies
  React.useEffect(() => {
      if (location.pathname !== '/saved-movies') {
        resetStates();
      }
  }, [location]);

  // логика отображения фильмов на /movies **

  // при монтировании проверяет localStorage. Если предыдущий поиск в нем сохранен, рендерит его
  React.useEffect(() => {
    if(localStorage.getItem('moviesToShow')) {
      setMoviesToShow(JSON.parse(localStorage.getItem('moviesToShow')));
    }
  }, []);

  // при первом рендере устанавливает в local storage стейт чекбокса на /movies
  React.useEffect(() => {
    localStorage.setItem('checkboxState', shortsChecked);
  }, []);

  // обновление стейта чекбокса на /movies и его запись в local storage
  function toggleCheckboxState() {
    const updatedState = !shortsChecked;
    setShortsChecked(updatedState);
    localStorage.setItem('checkboxState', JSON.stringify(updatedState));
  };

  // обновление чекбокса на /saved-movies
  function toggleSavedMoviesCheckboxState() {
    const updatedState = !savedMoviesShortsChecked;
    setSavedMoviesShortsChecked(updatedState);
  }

  // функция фильтрации по ключевому слову на /movies
  function filterMovies(array, name) {
      // массив со всеми фильмами по ключевому слову
      const filtredArray = array.filter(
        movie => movie.nameRU.toLowerCase().includes(name.toLowerCase())
        || movie.nameEN.toLowerCase().includes(name.toLowerCase())
      );
      setMoviesToShow(filtredArray);
      if(filtredArray.length === 0) {
        setIsMoviesToShowEmpty(true);
      } else if(filtredArray.length > 0) {
        setIsMoviesToShowEmpty(false);
      }
      localStorage.setItem('moviesToShow', JSON.stringify(filtredArray));
  };

  // запросы данных пользователя и сохраненных карточек
  React.useEffect(() => {
    if(isLoggedIn === true) {
    Promise.all([mainApi.getAllSavedMovies(), mainApi.getInfoAboutUser()])
    .then(([savedMovies, user]) => {
      setUserData(user);
      setInitialSavedMovies(savedMovies);
      setSavedMovies(savedMovies);
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })};
    return;
  }, [isLoggedIn]);

  // прокидывается в компонент SearchForm для обнуления стейта при каждом сабмите формы
  // function clearVisibleMoviesState() {
  //   if(isMobile) {
  //     setVisibleMovies(5);
  //   }
  //   if(isTablet) {
  //     setVisibleMovies(8);
  //   }
  //   if(isDesktop) {
  //     setVisibleMovies(12);
  //   }
  // };

  // const isMobile = window.innerWidth < 468;
  // const isTablet = window.innerWidth > 467 && window.innerWidth < 1280;
  // const isDesktop = window.innerWidth > 1279;

  // при монтировании рендерит кол-во карточек в зависимости от ширины экрана
  // React.useEffect(() => {
  //   if (isMobile) {
  //     setVisibleMovies(5);
  //   }
  //   if (isTablet) {
  //     setVisibleMovies(8);
  //   }
  //   if (isDesktop) {
  //     setVisibleMovies(12);
  //   }
  // }, []);

  // логика авторизации и логаута **
  
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
  };

  // управление сайдбаром **

  function openSidebar() {
    setSidebarOpen(true);
  };

  function closeSidebar() {
    setSidebarOpen(false);
  };

  // открыть/закрыть попап успешного обновления профиля
  function handlePopupChange() {
    isPopupOpen ? setIsPopupOpen(false) : setIsPopupOpen(true);
  }

  // console.log(savedMovies);

  return (
    <>
      <CurrentUserContext.Provider value={ userData }>
        <Routes>
          {/* главная страница */}
          <Route 
            path='/' 
            element={<MainPage isLoggedIn={ isLoggedIn }
            // управление сайдбаром, передается в компонент MainPage и HeaderNavigate для открытия по клику
            openSidebar={ openSidebar }
            />}
          />

          {/* страница с фильмами, защищена авторизацией */}
          <Route path='/movies' 
            element={ 
              <ProtectedRoute isLoggedIn={ isLoggedIn }
                element={ () =>
                  <Movies
                    // начальный массив фильмов
                    initialMovies={ initialMovies }
                    setInitialMovies={ setInitialMovies }

                    // массив для рендера на /movies
                    moviesToShow={ moviesToShow }

                    // стейт чекбокса, прелоадера, ошибки ответа сервера, пустой массив для рендера
                    shortsChecked={ shortsChecked }
                    isLoading={ isLoading }
                    serverErrorMessage={ serverErrorMessage }
                    setServerErrorMessage={ setServerErrorMessage }
                    isMoviesToShowEmpty={ isMoviesToShowEmpty }
                    setIsMoviesToShowEmpty={ setIsMoviesToShowEmpty }

                    // функция фильтра массива
                    filterMovies={ filterMovies }
                    
                    visibleMovies={ visibleMovies }
                    // clearVisibleMoviesState={ clearVisibleMoviesState }
                    openSidebar={ openSidebar }

                    savedMovies={ savedMovies }
                    // savedMoviesToShow={ savedMoviesToShow }
                    
                    setSavedMovies={ setSavedMovies }

                    handleChangeLoadingStatus={ setIsLoading }

                    toggleCheckboxState={ toggleCheckboxState }
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
                    // moviesToShow={ moviesToShow }
                    setSavedMovies={ setSavedMovies }
                    savedMovies={ savedMovies }

                    openSidebar={ openSidebar }
                    initialSavedMovies={ initialSavedMovies }

                    savedMoviesShortsChecked={ savedMoviesShortsChecked }
                    toggleSavedMoviesCheckboxState={ toggleSavedMoviesCheckboxState }
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
                    setUserData={ setUserData }
                    openSidebar={ openSidebar }
                    handlePopupChange={ handlePopupChange }
                    isPopupOpen={ isPopupOpen }
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
            <Register 
              checkToken={ checkToken }
            /> 
          }
          />

          <Route path='*' element={ <NotFoundPage/> }/>

        </Routes>
      </CurrentUserContext.Provider>
      <Sidebar isSidebarOpen={ isSidebarOpen } closeSidebar={ closeSidebar }></Sidebar>
    </>
  );
}

export default App;
