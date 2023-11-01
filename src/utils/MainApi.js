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

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        })
        .then(this._checkResponse)
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

    updateProfile({email, name}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ email, name})
        })
        .then(this._checkResponse)
    }

    getInfoAboutUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,  
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    logout() {
        return fetch(`${this._url}/signout`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    saveMovie(movieData) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(movieData),
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    getAllSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
        .then((res) => {
            if(res.ok) {
                return res;
            }    
        })
        .catch((err) => {
            console.log(err)
        })
    }
} 

export const mainApi = new MainApi(mainApiConfig);
