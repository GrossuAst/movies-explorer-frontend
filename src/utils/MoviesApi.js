import { moviesApiConfig } from "./constants";

export class MoviesApi {
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

    getMovies() {
        return fetch(this._url, {
            method: 'GET',
            // credentials: 'include',
            headers: this._headers,
        })
        .then(this._checkResponse);
    };

}

export const moviesApi = new MoviesApi(moviesApiConfig);
