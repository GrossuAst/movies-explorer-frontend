import './MovieCard.css';
import moviePromo from '../../../images/movie-pic.png'

function MovieCard() {
  return (
    <>
        <article className='card'>
            <img className='card__image' alt='Превью фильма' src={moviePromo}></img>
            <div className='card__descriprion'>
                <div>
                    <h3 className='card__title'>33 слова о дизайне</h3>
                    <p className='card__duration'>1ч 47м</p>
                </div>
                <div className='card__like'></div>
            </div>
            
        </article>
    </>
  );
}

export default MovieCard;