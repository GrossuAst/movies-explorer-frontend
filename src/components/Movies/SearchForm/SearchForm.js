import './SearchForm.css';
import Switch from '../../Switch/Switch';

function SearchForm() {
  return (
    <>
        <section className='search-form'>
            <div className='search-form__wrapper'>
              <form className='search-form__form'>
                <input className='search-form__input' type={'text'} placeholder='Фильм' required></input>
                <button className='search-form__button' type='submit'></button>
              </form>
              <div className='search-form__switch-box'>
                  <Switch></Switch>
                  <p className='search-form__text'>Короткометражки</p>
              </div>
            </div>
        </section>
    </>
  );
}

export default SearchForm;
