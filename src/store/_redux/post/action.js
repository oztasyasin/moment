import * as requestFromServer from "./crud";
export const GetAll = () => dispatch => {
    return requestFromServer
        .GetAll()
        .then(response => {
            if (response.status === 200) {
                return response.data
            }
            return null
        })
        .catch((err) => {
            return err.response.status
        })
}
export const GetByUserId = (id) => dispatch => {
    return requestFromServer
        .GetByUserId(id)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }
            return null
        })
        .catch((err) => {
            return null
        })
}
export const AddPost = (data) => dispatch => {
    return requestFromServer
        .AddPost(data)
        .then(response => {
            if (response.status == 200) {
                return true
            }
            return null
        })
        .catch((err) => {
            return null
        })
}
export const DeletePost = (data) => dispatch => {
    return requestFromServer
        .DeletePost(data)
        .then(response => {
            if (response.status == 200) {
                return true
            }
            return null
        })
        .catch((err) => {
            return null
        })
}