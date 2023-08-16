import './Techs.css';

function Techs() {
  return (
    <section className="technologies" id='technologies'>
        <div className='technologies__wrapper'>
            <h2 className='technologies__title'>Технологии</h2>
            <div>
                <h3 className='technologies__subtitle'>7 технологий</h3>
                <p className='technologies__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className='technologies__list'>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>HTML</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>CSS</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>JS</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>React</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>Git</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>Express.js</p>
                </li>
                <li className='technologies__bullet'>
                    <p className='technologies__tech'>mongoDB</p>
                </li>
            </ul>
        </div>
    </section>
  );
}

export default Techs;