import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Logo from '../Logo/Logo';
import '../Logo/Logo.css'

function Header(props) {

  const headerClasses = `header ${props.headerMixin || ''}`
  const wrapperClasses = `header__wrapper ${props.wrapperMixin || ''}`

  return (
    <header className={headerClasses}>
      <div className={wrapperClasses}>
        <Link to='/'>
          <Logo className='header__logo'></Logo>
        </Link>
        {props.children}
      </div>
    </header>
  );
}

export default Header;
