import React from 'react';
import { PopupWithForm } from "./PopupWithForm";

export function DeleteCardPopup({ card, onClose, onSubmit, isRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      isOpen={!!card}
      onClose={onClose}
      buttonName={isRequest ? "Удаление" : "Да"}
      onSubmit={handleSubmit}
    >

    </PopupWithForm>
  )
}