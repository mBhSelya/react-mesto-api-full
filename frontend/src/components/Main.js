import React, { useContext} from "react";
import Card from "./Card";
import { UserContext } from "../context/CurrentUserContext";


function Main(props) {
    const userData = useContext(UserContext);
    
    return(
        <>
            <main>
                <section className="profile">
                    <div className="profile__data">
                        <button onClick={props.onEditAvatar} className="profile__avatar-edit" type="button">
                            <img className="profile__avatar" src={`${userData.avatar}`} alt="Аватар" />
                        </button>
                        <div className="profile__info">
                            <div className="profile__title">
                                <h1 className="profile__name">{userData.name}</h1>
                                <button onClick={props.onEditProfile} className="profile__edit-button" type="button" aria-label="Изменить профиль"></button>
                            </div>
                            <p className="profile__description">{userData.about}</p>
                        </div>
                    </div>
                    <button onClick={props.onAddPlace} className="profile__add-button" type="button" aria-label="Добавить"></button>
                </section>
                <section className="cards">
                    {props.cards.map((cardInfo) => ( 
                        <Card key={cardInfo._id}
                            onCardClick = {props.onCardClick}
                            onCardLikeClick = {props.onCardLike}
                            onCardDelete = {props.onCardDelete}
                            dataCard = {cardInfo}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default Main;