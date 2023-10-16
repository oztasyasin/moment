import axios from 'axios';
import { getUrl } from '../../../helper/urlHelper';
import { getToken } from '../../../helper/tokenHelper';
const baseUrl = getUrl();
export const GetAll = () => {
    var config = {
        method: 'get',
        url: baseUrl + "/api/post/getAll",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}
export const GetByUserId = (id) => {
    var config = {
        method: 'get',
        url: `${baseUrl}/api/post/getByUserId/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}
export const AddPost = (data) => {
    var config = {
        method: 'post',
        url: baseUrl + "/api/post/add",
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + getToken()
        },
        data: data
    };
    return axios(config)
}

export const DeletePost = (data) => {
    var config = {
        method: 'delete',
        url: baseUrl + "/api/post/delete",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
        data: data
    };
    return axios(config)
}