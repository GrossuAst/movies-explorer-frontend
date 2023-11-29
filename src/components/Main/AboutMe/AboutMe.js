import './AboutMe.css';
import photo from '../../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me" id='about-me'>
        <div className='about-me__wrapper'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__info-container'>
                <div className='about-me__info'>
                    <h3 className='about-me__subtitle'>Максим</h3>
                    <h4 className='about-me__main-info'>Фронтенд-разработчик, 28 лет</h4>
                    <p className='about-me__description'>
                        В августе 2022 года я начал самостоятельно изучать программирование по обучающим видео. 
                        Меня это сильно увлекло, и уже в сентябре того же года я поступил на курс "Веб-разработчик" от Яндекс Практикума, который успешно завершил.
                        <br/>
                        Результатом моего обучения стало создание сайта, на котором вы сейчас находитесь.
                        Я продолжаю улучшать свои навыки и изучаю ряд других технологий, таких как TypeScript и Redux.
                        <br/>
                        В свободное время люблю читать художественную и научно-популярную литературу, смотреть качественное кино,
                        ходить в зал и слушать it-подкасты.
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