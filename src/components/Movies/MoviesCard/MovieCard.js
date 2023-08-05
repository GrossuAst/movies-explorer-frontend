import './MovieCard.css';
// import moviePromo from '../../../images/movie-pic.png'

function MovieCard({image, duration, title}) {
  return (
    <>
        <article className='card'>
            <img className='card__image' alt='Превью фильма' src={image}></img>
            <div className='card__descriprion'>
                <div>
                    <h3 className='card__title'>{title}</h3>
                    <p className='card__duration'>{duration}</p>
                </div>
                <div className='card__like'></div>
            </div>
            
        </article>
    </>
  );
}

export default MovieCard;