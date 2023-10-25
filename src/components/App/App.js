import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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

  const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) === null ? true : JSON.parse(localStorage.getItem('checkboxState'));

  const navigate = useNavigate();
  
  // стейт содержит булевое значение - залогинин пользователь или нет
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  // управление сайдбаром
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  // управление прелоадером
  const [isLoading, setIsLoading] = React.useState(false);

  // исходный массив с фильмами
  const [initialMovies, setInitialMovies] = React.useState([]);
  // отфильтрованный массив, передается в компонент MovieCardList для рендера
  const [moviesToShow, setMoviesToShow] = React.useState([]);

  // стейт пользователя
  const [userData, setUserData] = React.useState({});
  // исходный массив сохраненных фильмов
  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  // массив сохраненных фильмов для рендера
  const [savedArray, setSavedMovies] = React.useState([]);
  
  // управление кол-вом отображаемых карточек
  const [visibleMovies, setVisibleMovies] = React.useState(0);

  // состояние чекбокса короткометражек
  // нужно оптимизировать **
  const [shortsChecked, setShortsChecked] = React.useState(checkboxState);

  // при первом рендере устанавливает в local storage стейт чекбокса
  React.useEffect(() => {
    localStorage.setItem('checkboxState', shortsChecked);
  }, []);

  // обновление стейта чекбокса и его запись в local storage
  function toggleCheckboxState() {
    const updatedState = !shortsChecked;
    setShortsChecked(updatedState);
    localStorage.setItem('checkboxState', JSON.stringify(updatedState));
  }

  React.useEffect(() => {
    const storedMoviesToShow = JSON.parse(localStorage.getItem('moviesToShow'));
    if (storedMoviesToShow) {
      setMoviesToShow(storedMoviesToShow);
    }
  }, []);

  function filterMovies(array, name) {
      // массив со всеми фильмами по ключевому слову
      const filtredArray = array.filter(
        movie => movie.nameRU.toLowerCase().includes(name.toLowerCase())
        || movie.nameEN.toLowerCase().includes(name.toLowerCase())
      );

      setMoviesToShow(filtredArray);
      localStorage.setItem('moviesToShow', JSON.stringify(filtredArray));
  }

  // при монтировании проверяет localStorage. Если предыдущий поиск в нем сохранен, рендерит его
  React.useEffect(() => {
    if(localStorage.getItem('moviesToShow')) {
      setMoviesToShow(JSON.parse(localStorage.getItem('moviesToShow')));
    }
  }, []);

  // function filterByDuration(array) {
  //   const arr = array.filter((movie) => movie.duration <= 20);
  //   return arr;
  // }

  function handleChangeLoadingStatus() {
    if(isLoading) {
      setIsLoading(false)
    } else if(!isLoading) {
      setIsLoading(true);
    }
  };

  React.useEffect(() => {
    if(isLoggedIn === true) {
    Promise.all([mainApi.getAllSavedMovies(), mainApi.getInfoAboutUser()])
    .then(([savedMovies, user]) => {
      setUserData(user);
      setInitialSavedMovies(savedMovies);
      setSavedMovies(savedMovies);
      // console.log(savedMovies);
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })};
    return;
  }, [isLoggedIn]);

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
    // console.log(visibleMovies)
  }, []);

  // увеличение кол-ва карточек при клике на кнопку Еще
  // Math.min гарантирует, что стейт visibleMovies не будет больше чем длина массива moviesToShow
  function handleUpdateVisibleMovies() {
    if (isMobile) {
      setVisibleMovies(Math.min(visibleMovies + 1, moviesToShow.length));
    }
    if (isTablet) {
      setVisibleMovies(Math.min(visibleMovies + 2, moviesToShow.length));
    }
    if (isDesktop) {
      setVisibleMovies(Math.min(visibleMovies + 3, moviesToShow.length));
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
  };

  function openSidebar() {
    setSidebarOpen(true);
  };

  function closeSidebar() {
    setSidebarOpen(false);
  };

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
                    // начальный массив фильмов
                    initialMovies={ initialMovies }
                    setInitialMovies={ setInitialMovies }
                    // фильтр массива
                    filterMovies={ filterMovies }

                    // функция для изменения стейта отфильтрованного массива, прокидывается в компонент поисковика
                    // filterArray={ filterArray }
                    moviesToShow={ moviesToShow }
                    visibleMovies={ visibleMovies }
                    handleUpdateVisibleMovies={ handleUpdateVisibleMovies }
                    clearVisibleMoviesState={ clearVisibleMoviesState }
                    openSidebar={ openSidebar }

                    savedArray={ savedArray }
                    // savedMoviesToShow={ savedMoviesToShow }

                    
                    // searchMovies={ searchMovies }
                    setSavedMovies={ setSavedMovies }
                    
                    
                    isLoading={ isLoading }
                    handleChangeLoadingStatus={ setIsLoading }
                    // switchCheckboxChecked={ switchCheckboxChecked }
                    shortsChecked={ shortsChecked }
                    setShortsChecked={ setShortsChecked }
                    toggleCheckboxState={ toggleCheckboxState }
                    // filterMoviesToShow={ filterMoviesToShow }
                    // filterByDuration={ filterByDuration }
                    
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
                    moviesToShow={ moviesToShow }
                    setSavedMovies={ setSavedMovies }
                    savedArray={ savedArray }
                    // savedMoviesToShow={ savedMoviesToShow }
                    openSidebar={ openSidebar }
                    initialSavedMovies={ initialSavedMovies }
                    // switchCheckboxChecked={ switchCheckboxChecked }
                    shortsChecked={ shortsChecked }
                    setShortsChecked={ setShortsChecked }
                    toggleCheckboxState={ toggleCheckboxState }
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
