import axios from 'axios';
import { getUrl } from '../../../helper/urlHelper';
import { getToken } from '../../../helper/tokenHelper';
import store from '../../Store';
export const login = (data) => {
    var config = {
        method: 'post',
        url: getUrl() + "/api/auth/login",
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
        url: getUrl() + "/api/auth/register",
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
        url: getUrl() + "/api/auth/uploadProfilePhoto",
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + getToken()
        },
        data: data
    };
    return axios(config)
}

export const getFriends = () => {
    var config = {
        method: 'get',
        url: `${getUrl()}/api/auth/getFriends/${store.getState().auth.user.id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}

export const getInvites = () => {
    var config = {
        method: 'get',
        url: `${getUrl()}/api/auth/getInvites/${store.getState().auth.user.id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}

export const acceptInvite = (id) => {
    var config = {
        method: 'put',
        url: `${getUrl()}/api/auth/acceptInvite/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}


export const declineInvite = (id) => {
    var config = {
        method: 'delete',
        url: `${getUrl()}/api/auth/declineInvite/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}
export const getUsers = () => {
    var config = {
        method: 'get',
        url: `${getUrl()}/api/auth/getUsers/${store.getState().auth.user.id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}

export const sendInvite = (data) => {
    var config = {
        method: 'post',
        url: `${getUrl()}/api/auth/sendInvite`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
        data: data
    };
    return axios(config)
}

export const deleteFriendship = (id) => {
    var config = {
        method: 'delete',
        url: `${getUrl()}/api/auth/deleteFriendship/${store.getState().auth.user.id}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}