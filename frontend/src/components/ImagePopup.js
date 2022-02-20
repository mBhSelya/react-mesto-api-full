export default function ImagePopup(props) {
    return(
        <div className={`popup ${props.card.name && 'popup_opened'}`} id="open-image">
            <form className="popup__container-image" name="open-image">
                <img className="popup__image" src={`${props.card.link ? props.card.link : 'https://images.unsplash.com/photo-1645214639998-08df7af99fb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}`} alt={`${props.card.name}`} />
                <h2 className="popup__signature">{props.card.name}</h2>
                <button onClick = {props.onClose} className="popup__button-close popup__button-close_image" type="button"></button>
            </form>
        </div>
    )
}
    
