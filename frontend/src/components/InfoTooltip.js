import React from 'react';

export function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (

    <div className={`popup info-tooltip-popup ${isOpen && "popup_opened"}`} onClick={onClose}>
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <div className={`${isSuccess ? "popup__tooltip-image_type_success" : "popup__tooltip-image_type_failure"}`}></div>
        <p className="popup__tooltip-text">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
    
  )
}