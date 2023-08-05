import React from 'react';
import { Link } from 'react-router-dom';

import './MainPage.css';
import Header from '../Header/Header';
import HeaderLoginButtons from '../Header/HeaderLoginButtons/HeaderLoginButtons';
import HeaderNavigate from '../Header/HeaderNavigate/HeaderNavigate';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function MainPage({isLoggedIn}) {
  return (
    <>
      <Header>
        {/* в зависимости от стейта, header рендерит разное содержимое */}
        { isLoggedIn ? <HeaderNavigate /> : <HeaderLoginButtons /> }
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