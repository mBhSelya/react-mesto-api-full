export default function ImagePopup(props) {
    return(
        <div className={`popup ${props.card.name && 'popup_opened'}`} id="open-image">
            <form className="popup__container-image" name="open-image">
                <img className="popup__image" src={`${props.card.link}`} alt={`${props.card.name}`} />
                <h2 className="popup__signature">{props.card.name}</h2>
                <button onClick = {props.onClose} className="popup__button-close popup__button-close_image" type="button"></button>
            </form>
        </div>
    )
}
    
