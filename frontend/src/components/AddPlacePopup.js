import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [nameCard, setNameCard] = useState('');
    const [linkCard, setlinkCard] = useState('');

    function handleNameCard(e) {
        setNameCard(e.target.value);
    }

    function handleLinkCard(e) {
        setlinkCard(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameCard,
            link: linkCard
        }, () => {
            setNameCard('');
            setlinkCard('');
        });
    }
    return(
        <PopupWithForm
            name="addPlace"
            title="Новое место"
            buttonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
                <input onChange={handleNameCard} value={nameCard} className="popup__input popup__input_add_name" id="name-input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="name-input-error popup__input-error"></span>
                <input onChange={handleLinkCard} value={linkCard} className="popup__input popup__input_add_link" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required />
                <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    )
}