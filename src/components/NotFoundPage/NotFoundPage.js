import { Link } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage () {
    const linkStyle = {
        textDecoration: 'none', // Убирает у Link подчеркивание
    };

    return (
        <>
            <div className='not-found-page'>
                <div className='not-found-page__wrapper'>
                    <h1 className='not-found-page__title'>404</h1>
                    <p className='not-found-page__subtitle'>Страница не найдена</p>
                    <Link to='/' style={linkStyle}>
                        <p className='not-found-page__link'>Назад</p>
                    </Link>        
                </div>
            </div>
        </>
    )
}

export default NotFoundPage;
