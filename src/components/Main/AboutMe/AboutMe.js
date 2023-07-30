import './AboutMe.css';
import photo from '../../../images/dummy.jpg';

function AboutMe() {
  return (
    <section className="about-me">
        <div className='about-me__wrapper'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__info-container'>
                <div className='about-me__info'>
                    <h3 className='about-me__subtitle'>Виталий</h3>
                    <h4 className='about-me__main-info'>Фронтенд-разработчик, 30 лет</h4>
                    <p className='about-me__description'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href='https://github.com/GrossuAst' className='about-me__github' target='_blank' rel="noreferrer">Github</a>
                </div>
                <img alt='Фото автора' className='about-me__photo' src={photo}></img>    
            </div>
        </div>
    </section>
  );
}

export default AboutMe;