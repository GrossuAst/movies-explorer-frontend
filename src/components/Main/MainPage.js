import { Link } from 'react-router-dom';

import './MainPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function MainPage() {
  return (
    <>
      <Header>
        <div className='header__buttons'>
          <Link to='/signup'>
            <button className='header__signup-button'>Регистрация</button>
          </Link>
          <Link to='/signin'>
            <button className='header__signin-button'>Войти</button>
          </Link>
        </div>
      </Header>
      <main>
          <Promo></Promo>
          <NavTab></NavTab>
          <AboutProject></AboutProject>
          <Techs></Techs>
          <AboutMe></AboutMe>
          <Portfolio></Portfolio>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MainPage;