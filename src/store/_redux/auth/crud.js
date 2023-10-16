import axios from 'axios';
import { getUrl } from '../../../helper/urlHelper';
import { getToken } from '../../../helper/tokenHelper';
const baseUrl = getUrl();
export const login = (data) => {
    var config = {
        method: 'post',
        url: baseUrl + "/api/auth/login",
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    return axios(config)
}

export const register = (data) => {
    var config = {
        method: 'post',
        url: baseUrl + "/api/auth/register",
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    return axios(config)
}

export const uploadProfilePhoto = (data) => {
    var config = {
        method: 'post',
        url: baseUrl + "/api/auth/uploadProfilePhoto",
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + getToken()
        },
        data: data
    };
    return axios(config)
}