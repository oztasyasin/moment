import { ppHelper } from "../../../helper/ppHelper";
import { getCommonSlice, getCommonState } from "../common/service";
import * as requestFromServer from "./crud";
import { Slice, callTypes } from "./slice";
const { actions } = Slice;
export const login = (data) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .login(data)
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

export const register = (data) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .register(data)
        .then(response => {
            if (response.status == 200) {
                const newData = {
                    ...response.data,
                    success: true
                }
                return newData
            }
        })
        .catch((err) => {
            if (Array.isArray(err.response.data)) {
                const arr = err.response.data.map((obj) => obj.description);
                return arr
            }
            return err
        })
}

export const uploadProfilePhoto = (data) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .uploadProfilePhoto(data)
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


export const getFriends = () => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getFriends()
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


export const getInvites = () => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getInvites()
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


export const acceptInvite = (id) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .acceptInvite(id)
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

export const declineInvite = (id) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .declineInvite(id)
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

export const getUsers = () => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getUsers()
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

export const sendInvite = (data) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .sendInvite(data)
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

export const deleteFriendship = (id) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .deleteFriendship(id)
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



