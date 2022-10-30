import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser?._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser?._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card-template">
      <li className="element">
        <button className="element__picture-button" type="button" onClick={handleClick}>
          <img className="element__image"
            src={card.link}
            alt={card.name} />
        </button>
        <div className="element__description">
          <h3 className="element__title">{card.name}</h3>
          <div className="element__like-section">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      </li>
    </div>
  )
}

export default React.memo(Card);