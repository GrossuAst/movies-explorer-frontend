import './NavTab.css';

function NavTab() {
  return (
    <section className="nav">
        <div className='nav__wrapper'>
            <nav>
                <ul className='nav__list'>
                    <li className='nav__bullet'>
                        <a href='тут будет якорь' className='nav__link'>О проекте</a>
                    </li>
                    <li className='nav__bullet'>
                        <a href='тут будет якорь' className='nav__link'>Технологии</a>
                    </li>
                    <li className='nav__bullet'>
                        <a href='тут будет якорь' className='nav__link'>Студент</a>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
  );
}

export default NavTab;