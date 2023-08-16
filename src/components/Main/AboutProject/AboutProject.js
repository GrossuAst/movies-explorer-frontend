import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id='about-project'>
        <div className="about-project__wrapper">
            <h2 className='about-project__title'>О проекте</h2>
            <ul className='about-project__list'>
                <li className='about-project__list-element'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='about-project__list-element'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <article className='about-project__timing'>
                <div className='about-project__backend'>
                    <div className='about-project__backend-chart'>
                        <p className='about-project__duration'>1 неделя</p>
                    </div>
                    <p className='about-project__chart-info'>Back-end</p>
                </div>
                <div className='about-project__frontend'>
                    <div className='about-project__frontend-chart'>
                        <p className='about-project__duration'>4 недели</p>
                    </div>
                    <p className='about-project__chart-info'>Front-end</p>
                </div>
            </article>
        </div>
    </section>
  );
}

export default AboutProject;