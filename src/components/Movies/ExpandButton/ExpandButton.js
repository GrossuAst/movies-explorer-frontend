import '../../../styles/commonStyles.css';

function ExpandButton({ handleClick }) {
    return (
        <section className='expand-button' onClick={ handleClick }>
            <div className='expand-button__wrapper'>
                <button className='expand-button__button' type='button'>Ещё</button>
            </div>
        </section>
    )
}

export default ExpandButton;