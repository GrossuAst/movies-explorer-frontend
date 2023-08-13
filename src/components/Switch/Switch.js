import './Switch.css';

function Switch() {
    return (
        <div className='wrap'>
            <input type='checkbox' id='slider-point' defaultChecked/>
            <label className='wrap__slider' htmlFor='slider-point'></label>
        </div>
    )
}

export default Switch;
