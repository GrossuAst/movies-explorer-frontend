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
    
}

export const mainApi = new MainApi(mainApiConfig);
