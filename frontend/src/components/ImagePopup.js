import React from "react";

export function ImagePopup({ card, onClose }) {

  return (

    <div className={`popup open-picture-popup popup_picture-show ${card && "popup_opened"}`} onClick={onClose}>
      <div className="popup__picture-container" onClick={e => e.stopPropagation()}>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h3 className="popup__picture-description">{card?.name}</h3>
        <button
          className="popup__close-button popup__close-picture-show"
          type="button" onClick={onClose}
        ></button>
      </div>
    </div>
    
  )

}