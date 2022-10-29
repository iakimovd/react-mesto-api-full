import React, { useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  function handleNameAdd(e) {
    setName(e.target.value);
  }

  function handleLinkAdd(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место" name="add-card" isOpen={isOpen} onClose={onClose} buttonName="Создать" onSubmit={handleSubmit}>

      <>
        <fieldset className="popup__inputs">
          <input
            className="popup__input popup__input_type_card-name"
            id="card-name-input"
            type="text"
            name="cardname"
            placeholder="Название"
            required
            // @ts-ignore
            minLength="2"
            // @ts-ignore
            maxLength="30"
            value={name}
            onChange={handleNameAdd}
          />
          <span className="popup__input-error" id="card-name-input-error"></span>
        </fieldset>
        <fieldset className="popup__inputs">
          <input
            className="popup__input popup__input_type_link"
            id="link-input"
            type="url"
            name="cardlink"
            placeholder="Ссылка на картинку"
            required
            pattern="https://.*"
            value={link}
            onChange={handleLinkAdd}
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </fieldset>
      </>

    </PopupWithForm>
  )
}