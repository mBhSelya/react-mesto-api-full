import React from "react";
import { UserContext } from "../context/CurrentUserContext";

export default function Card(props) {
    const userData = React.useContext(UserContext);
    
    function handleClick() {
        props.onCardClick(props.dataCard);
    }

    function handleCardLike() {
        props.onCardLikeClick(props.dataCard);
    }

    function handleCardDelete() {
        props.onCardDelete(props.dataCard);
    }

    const isOwn = props.dataCard.owner._id === userData._id;
    const isLiked = props.dataCard.likes.some(i => i._id === userData._id);

    return(
        <article className="card">
            <button onClick = {handleCardDelete} className={`card__delete-button ${!isOwn && 'card__delete-button_owner'}`} type="button"></button>
            <img onClick = {handleClick} className="card__image" src={`${props.dataCard.link}`} alt={`${props.dataCard.name}`} />
            <div className="card__info">
                <h2 className="card__title">{props.dataCard.name}</h2>
                <div className="card__like">
                    <button onClick = {handleCardLike} className={`card__like-icon ${isLiked && 'card__like-icon_active'}`} type="button" aria-label="Лайк"></button>
                    <p className="card__like-counter">{props.dataCard.likes.length}</p>
                </div>
            </div>
        </article>
    )
}