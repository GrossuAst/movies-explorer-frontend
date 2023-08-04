import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';

function MovieCardList() {
  return (
    <>
        <section className='movie-block'>
          <div className='movie-block__wrapper'>
            <ul className='movie-block__list'>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
                <li className='movie-block__card'>
                    <MovieCard/>
                </li>
            </ul>
          </div>
        </section>
    </>
  );
}

export default MovieCardList;