import React, { useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      // @ts-ignore
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    // @ts-ignore
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >

      <fieldset className="popup__inputs">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-input"
          type="url"
          name="avatarlink"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
        />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </fieldset>

    </PopupWithForm>
  )
}