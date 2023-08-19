import '../../../styles/commonStyles.css';

function ExpandButton({ handleUpdateVisibleMovies }) {
    return (
        <section className='expand-button' onClick={handleUpdateVisibleMovies}>
            <div className='expand-button__wrapper'>
                <button className='expand-button__button' type='button'>Ещё</button>
            </div>
        </section>
    )
}

export default ExpandButton;