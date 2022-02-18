import { Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {

    function signOut() {
        localStorage.removeItem('jwt');
    }
    
    return(
        <header className="header">
            <a className="header__logo" href=" " target="_blank"> </a>
                <Switch>
                    <Route path="/sign-up">
                        <Link className="header__button" to="/sign-in">Войти</Link>
                    </Route>
                    <Route path="/sign-in">
                        <Link className="header__button" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path="/">
                        <div className="header__nav-bar">
                            <p className="header__email">{props.email}</p>
                            <Link onClick={signOut} className="header__button header__button_exit" to="/sign-in">Выйти</Link>
                        </div>
                    </Route>
                </Switch>
        </header>
    )
}