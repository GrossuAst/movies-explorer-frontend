import './Portfolio.css';
import linkLogo from '../../../images/link-image-portfolio-min.svg';

function Portfolio() {
  return (
    <section className="portfolio">
        <div className='portfolio__wrapper'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__link-list'>
                <li className='portfolio__bullet'>
                    <a href='https://grossuast.github.io/how-to-learn/' className='portfolio__link' target='_blank' rel="noreferrer">
                        Статичный сайт
                        <div className='portfolio__link-img' alt='Логотип ссылки'></div>
                    </a>
                </li>
                <li className='portfolio__bullet'>
                    <a href='https://grossuast.github.io/russian-travel/' className='portfolio__link' target='_blank' rel="noreferrer">
                        Адаптивный сайт
                        <div className='portfolio__link-img' alt='Логотип ссылки'></div>
                    </a>
                </li>
                <li className='portfolio__bullet'>
                    {/* ссылка временно ведет на гх проекта, т.к. сервер отключен */}
                    <a href='https://github.com/GrossuAst/react-mesto-api-full-gha' className='portfolio__link' target='_blank' rel="noreferrer">
                        Одностраничное приложение
                        <div className='portfolio__link-img' alt='Логотип ссылки'></div>
                    </a>
                </li>
            </ul>
        </div>
    </section>
  );
}

export default Portfolio;