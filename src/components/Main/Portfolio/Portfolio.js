import './Portfolio.css';
import linkLogo from '../../../images/link-image-portfolio-min.svg';

function Portfolio() {
  return (
    <section className="portfolio">
        <div className='portfolio__wrapper'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__link-list'>
                <li className='portfolio__bullet'>
                    <a href='https://grossuast.github.io/how-to-learn/' className='portfolio__link' target='_blank' rel="noreferrer">Статичный сайт</a>
                    <a href='https://grossuast.github.io/how-to-learn/' className='portfolio__link-img' target='_blank' rel="noreferrer">
                        {/* <img alt='Логотип ссылки' src={linkLogo}></img> */}
                    </a>
                </li>
                <li className='portfolio__bullet'>
                    <a href='https://grossuast.github.io/russian-travel/' className='portfolio__link' target='_blank' rel="noreferrer">Адаптивный сайт</a>
                    <a href='https://grossuast.github.io/russian-travel/' className='portfolio__link-img' target='_blank' rel="noreferrer">
                        {/* <img alt='Логотип ссылки' src={linkLogo}></img> */}
                    </a>
                </li>
                <li className='portfolio__bullet'>
                    <a href='https://grossuast.mesto.nomoredomains.xyz/' className='portfolio__link' target='_blank' rel="noreferrer">Одностраничное приложение</a>
                    <a href='https://grossuast.mesto.nomoredomains.xyz/' className='portfolio__link-img' target='_blank' rel="noreferrer">
                        {/* <img className='' alt='Логотип ссылки' src={linkLogo}></img> */}
                    </a>
                </li>
            </ul>
        </div>
    </section>
  );
}

export default Portfolio;