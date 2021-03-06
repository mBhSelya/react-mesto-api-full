import Main from "./Main";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import ImagePopup from "./ImagePopup";
import { ApiConfig } from "../utils/Api";
import { UserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";

function App() {
    const [editProfilePopupOpen, setEditProfilePopupOpened] = useState(false);
    const [addPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
    const [editAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
    const [infoTooltipOpen, setInfoTooltipOpened] = useState(false);
    const [confirmRegister, setConfirmRegister] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailHeader, setEmailHeader] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (loggedIn === true) {
            ApiConfig.getInitialCards()
                .then((res) => {
                    setCards(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn === true) {
            ApiConfig.getInfoUser()
                .then((res) => {
                    setCurrentUser(res.data[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn])

    function handleEditAvatarClick() {
        setEditAvatarPopupOpened(true);
    }
    
    function handleEditProfileClick() {
        setEditProfilePopupOpened(true);
    }
    
    function handleAddPlaceClick() {
        setAddPlacePopupOpened(true);
    }

    function handleInfoTooltip() {
        setInfoTooltipOpened(true);
    }

    function handleCardClick(item) {
        setSelectedCard(item);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpened(false);
        setEditProfilePopupOpened(false);
        setAddPlacePopupOpened(false);
        setSelectedCard({});
        setInfoTooltipOpened(false);
    }

    function handleUpdateUser(obj) {
        ApiConfig.sendUserInfo(obj)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar(link, func) {
        ApiConfig.editAvatar(link)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
                func();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddCard(obj, func) {
        ApiConfig.postNewCard(obj)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
                func();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        ApiConfig.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((prevCards) => prevCards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        ApiConfig.deleteCard(card._id)
            .then(() => {
                setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
                console.log(cards);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleRegister(email, password) {
        Auth.register( password, email )
            .then(() => {
                setConfirmRegister(true);
                handleInfoTooltip();
                history.push('/signin');
            })
            .catch((err) => {
                setConfirmRegister(false);
                handleInfoTooltip();
                console.log(err);
            })
    }

    function handleLogin(email, password) {
        Auth.authorize(email, password)
            .then((res) => {
                
                tokenCheck();
            })
            .catch((err) => {
                setConfirmRegister(false);
                handleInfoTooltip();
                console.log(err);
            })
    }

    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    function tokenCheck() {
        Auth.getContent()
            .then((res) => {
                setLoggedIn(true);
                setEmailHeader(res.data[0].email);
                setCurrentUser(res.data[0]);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (loggedIn === true) {
            tokenCheck();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])
    
    return (
        <UserContext.Provider value={currentUser}>
            <InfoTooltip
                isOpen={infoTooltipOpen}
                onClose={closeAllPopups}
                isConfirm={confirmRegister}
            />
            <Header 
                email={emailHeader}
            />
            <Switch>
                <ProtectedRoute 
                    exact path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                />
                <Route path="/signup">
                    <Register 
                        onSubmit={handleRegister}
                    />
                </Route>
                <Route path="/signin">
                    <Login
                        onSubmit={handleLogin}
                    />
            </Route>
            </Switch>
            <Footer />
            <EditProfilePopup
                onUpdateUser={handleUpdateUser} 
                isOpen={editProfilePopupOpen} 
                onClose={closeAllPopups} 
            /> 
            <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={editAvatarPopupOpen} 
                onClose={closeAllPopups} 
            />
            <AddPlacePopup
                onAddPlace={handleAddCard}
                isOpen={addPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <ImagePopup
                onClose={closeAllPopups}
                card={selectedCard}
            />
        </UserContext.Provider>
    );
}

export default App;