import './Header.css';
import Logo from '../Logo/Logo';
import '../Logo/Logo.css'

function Header() {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Logo className='header__logo'></Logo>
        <div className='header__buttons'>
          <button className='header__signup-button'>Регистрация</button>
          <button className='header__signin-button'>Войти</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
