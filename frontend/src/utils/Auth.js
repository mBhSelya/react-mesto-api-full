export const BASE_URL = 'http://api.mesto.mbhselya.nomoredomains.xyz';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ( password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({password, email})
    })
    .then(checkResponse);
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      credentials: 'include',
      body: JSON.stringify({password, email})
    })
    .then(checkResponse);
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
    })
    .then(checkResponse);
}