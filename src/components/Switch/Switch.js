import './Switch.css';

function Switch() {
    return (
        <div class='wrap'>
            <input type='checkbox' id='slider-point' defaultChecked/>
            <label className='wrap__slider' for='slider-point'></label>
        </div>
    )
}

export default Switch;
