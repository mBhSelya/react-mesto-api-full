import { Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {

    function signOut() {
        localStorage.removeItem('jwt');
    }
    
    return(
        <header className="header">
            <a className="header__logo" href=" " target="_blank"> </a>
                <Switch>
                    <Route path="/signup">
                        <Link className="header__button" to="/signin">Войти</Link>
                    </Route>
                    <Route path="/signin">
                        <Link className="header__button" to="/signup">Регистрация</Link>
                    </Route>
                    <Route path="/">
                        <div className="header__nav-bar">
                            <p className="header__email">{props.email}</p>
                            <Link onClick={signOut} className="header__button header__button_exit" to="/signin">Выйти</Link>
                        </div>
                    </Route>
                </Switch>
        </header>
    )
}