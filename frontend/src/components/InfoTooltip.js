import goodIcon from '../images/Union-true.svg';
import badIcon from '../images/Union(x).svg';

export default function InfoTooltip(props) {
    return(
        <div className={`popup ${props.isOpen && 'popup_opened'}`} >
            <form  className="popup__container"  noValidate>
                <fieldset className="popup__set popup__set_register">
                    <button onClick={props.onClose} className="popup__button-close"  type="button" aria-label="Закрыть"></button>
                    <img className="popup__icon" src={`${props.isConfirm ? goodIcon : badIcon}`} alt="Иконка"/>
                    <h2 className="popup__title popup__title_register">{`${props.isConfirm ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
                </fieldset>
            </form>
        </div>
    )
}