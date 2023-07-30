import './Promo.css';
import PromoLogo from '../../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo">
        <div className="promo__wrapper">
            <img alt='Промо-изображение сайта' src={PromoLogo} className='promo__image'/>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        </div>
    </section>
  );
}

export default Promo;