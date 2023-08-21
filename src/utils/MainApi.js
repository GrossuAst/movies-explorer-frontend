import { mainApiConfig } from "./constants";

export class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    };

    register() {

    };

    login(password, email) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ password, email })
        })
        .then(this._checkResponse)
    };

    getInfoAboutUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,  
        })
        .then(this._checkResponse)
    }

    // tokenValidate() {
    //     return fetch(`${this._url}/users/me`, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             // "Authorization" : `Bearer ${jwt}`
    //         },
    //         credentials: 'include'
    //     })
    //     .then(this._checkResponse)
    // }
}

export const mainApi = new MainApi(mainApiConfig);
