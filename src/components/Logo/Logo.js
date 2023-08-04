import './Logo.css';
import mainLogo from '../../images/main-logo-min.svg';

function Logo() {
  return (
    <img alt='Логотип сайта' src={mainLogo} className='header__logo'/>
  );
}

export default Logo;