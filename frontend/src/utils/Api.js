class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfoUser() {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    sendUserInfo({name, about}) {
         return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then(this._checkResponse)
    }

    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(id, likeStatus) {
        if (likeStatus) {
            return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResponse)
        }
    }

    editAvatar(link) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
        .then(this._checkResponse)
    }
}

export const ApiConfig = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
    headers: {
        authorization: '2808c73a-a30b-458f-af2d-b76704edccd0',
        'Content-Type': 'application/json'
    }
});