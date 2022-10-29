import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >

      <>
        <fieldset className="popup__inputs">
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            required
            // @ts-ignore
            minLength="7"
            // @ts-ignore
            maxLength="40"
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__input-error" id="name-input-error"></span>
        </fieldset>
        <fieldset className="popup__inputs">
          <input
            className="popup__input popup__input_type_job"
            id="job-input"
            type="text"
            name="job"
            placeholder="Профессия"
            required
            // @ts-ignore
            minLength="7"
            // @ts-ignore
            maxLength="200"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error" id="job-input-error"></span>
        </fieldset>
      </>

    </PopupWithForm>
  )
}