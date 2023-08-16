import React from 'react';

import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { useLocation } from 'react-router-dom';

function MovieCardList({moviesArray, savedMovies}) {
  const location = useLocation();
  const isMoviesPage = location.pathname === '/movies';

  // статичное отображение. Разное количество для разных экранов рендерится только при перезагрузке
  let visibleMovies;
  if (window.innerWidth < 468) {
    visibleMovies = 5;
  }
  if (window.innerWidth > 467 && window.innerWidth < 866) {
    visibleMovies = 8;
  }
  if (window.innerWidth > 865) {
    visibleMovies = 12;
  }

  // const [isLoaded, setIsLoaded] = React.useState(false);
  // React.useEffect(() => {
  //   if(moviesArray !== null) {
  //     setIsLoaded(true);
  //   };
  // }, []);

  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            <ul className='movie-block__list'>

              {/* в зависимости от адреса movies/saved-movies рендерит соответствующий массив */}
              { isMoviesPage ? moviesArray.slice(0, visibleMovies).map((movie) => (
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