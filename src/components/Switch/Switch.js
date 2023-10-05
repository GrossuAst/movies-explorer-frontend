import './Switch.css';

function Switch({ shortsChecked, setShortsChecked }) {

    function switchCheckboxChecked() {
        setShortsChecked(!shortsChecked);
    };

    return (
        <div className='wrap'>
            <input type='checkbox' id='slider-point' 
                checked={ shortsChecked }
                onChange={ switchCheckboxChecked }
            />
            <label className='wrap__slider' htmlFor='slider-point'></label>
        </div>
    )
}

export default Switch;
