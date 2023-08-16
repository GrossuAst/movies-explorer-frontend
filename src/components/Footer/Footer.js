import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__wrapper'>
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__copyright'>
                <p className='footer__right'>&#169; 2023</p>
                <ul className='footer__link-list'>
                    <li>
                        <a href='https://practicum.yandex.ru/' className='footer__link' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a href='https://github.com/GrossuAst' className='footer__link' target='_blank' rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  );
}

export default Footer;