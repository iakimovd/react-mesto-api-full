import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";

export function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-section">
          <img className="profile__avatar"
            src={currentUser?.avatar}
            alt="Аватар пользователя" />
          <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile} />
          <p className="profile__profession">{currentUser?.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>

      <section className="elements-section">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            )
          }
          )}
        </ul>
      </section>

    </main>
  )
} 