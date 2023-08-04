import { Link, useLocation } from 'react-router-dom';

import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import ExpandButton from './ExpandButton/ExpandButton';
import Footer from '../Footer/Footer';

function Movies() {
    const location = useLocation();  // хук useLocation для определения адреса
    const isMoviesPage = location.pathname === '/movies';
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

  return (
    <>
        <Header
            headerMixin={isMoviesPage ? 'header_type_movies' : ''}
            wrapperMixin={isMoviesPage ? 'header__wrapper_type_movies' : ''}
        >
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li >
                        <Link to='/movies'>
                            <button className='header__nav-link'>Фильмы</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/saved-movies'>
                            <button className='header__nav-link'>Сохранённые фильмы</button>
                        </Link>
                    </li>
                </ul>
                <div className='header__nav-list'>
                    <Link to='/profile' style={linkStyle}>
                        <button className='header__account-button'>
                            Аккаунт
                            <div className='header__account-logo'></div>
                        </button>
                    </Link>
                </div>
            </nav>
        </Header>
        <main className='main'>
            <SearchForm></SearchForm>
            <MovieCardList></MovieCardList>
            <ExpandButton></ExpandButton>
        </main>
        <Footer></Footer>
    </>
  );
}

export default Movies;