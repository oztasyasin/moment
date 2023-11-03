import axios from 'axios';
import { getUrl } from '../../../helper/urlHelper';
import { getToken } from '../../../helper/tokenHelper';
import { getAuthState } from '../auth/service';
const baseUrl = getUrl();
export const GetAll = () => {
    var config = {
        method: 'get',
        url: `${getUrl()}/api/post/getFriendsPosts/${getAuthState().user.id}`,
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
        url: `${getUrl()}/api/post/getByUserId/${id}`,
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
        url: getUrl() + "/api/post/add",
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
        url: getUrl() + "/api/post/delete/" + data.id,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + getToken()
        },
    };
    return axios(config)
}