import React from "react";

import './Popup.css';
import Icon from '../../images/icon.svg'

function Popup({ isPopupOpen, handleClosePopup, handlePopupChange }) {

    return(
        <div className={`popup  ${isPopupOpen ? "popup_opened" : "" }` }>
            <div className="popup__container">
                <button type="button" aria-label="#" className="popup__close-icon"
                    onClick={ handlePopupChange }
                >    
                </button>
                <h2 className="popup__title">Профиль обновлен</h2>
                <img alt="значок успешного ответа" src={Icon} className='popup__image' />                        
            </div>
        </div>
    )
}

export default Popup;