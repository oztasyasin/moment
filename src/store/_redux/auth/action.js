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
                const newData = {
                    ...response.data,
                    profilePhoto: ppHelper(response.data.profilePhoto)
                }
                return newData
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
                    data: {
                        ...response.data,
                        profilePhoto: ppHelper(response.data.profilePhoto)
                    },
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