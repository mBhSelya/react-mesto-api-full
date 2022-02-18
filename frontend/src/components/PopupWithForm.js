function PopupWithForm(props) {
    return(
        <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.name}>
            <form onSubmit = {props.onSubmit} className="popup__container" name={props.name}>
                <fieldset className="popup__set">
                    <button className="popup__button-close" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__button-save">{props.buttonText}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PopupWithForm;