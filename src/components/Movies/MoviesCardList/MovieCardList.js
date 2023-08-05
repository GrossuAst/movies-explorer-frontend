import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { useLocation } from 'react-router-dom';

function MovieCardList({movies, savedMovies}) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';
  const isSavedMovesPage = location.pathname === '/saved-movies';

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            <ul className='movie-block__list'>
              { isMoviesPage ? movies.map((movie) => (
                <li key={movie._id} className='movie-block__card'>
                  <MovieCard
                    title={movie.title}
                    duration={movie.duration}
                    image={movie.image}
                  />
                </li>
              )) 
              : 
              savedMovies.map((movie) => (
                <li key={movie._id} className='movie-block__card'>
                  <MovieCard
                    title={movie.title}
                    duration={movie.duration}
                    image={movie.image}
                  />
                </li>
              )) }
            </ul>
          </div>
        </section>
    </>
  );
}

export default MovieCardList;