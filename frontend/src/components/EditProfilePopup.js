import React from "react";
import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleName(e) {
        setName(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = useContext(UserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    }

    return(
        <PopupWithForm 
            name="Profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
                <input onChange = {handleName} value={name || ''} className="popup__input popup__input_profile_name" id="nickname-input" type="text" name="name" placeholder = "Имя" minLength="2" maxLength="40" required />
                <span className="nickname-input-error popup__input-error"> </span>
                <input onChange = {handleDescription} value={description || ''} className="popup__input popup__input_profile_description" id="description-input" type="text" name="about" placeholder="Вид деятельности" minLength="2" maxLength="200" required />
                <span className="description-input-error popup__input-error"> </span>
        </PopupWithForm>
    )
}