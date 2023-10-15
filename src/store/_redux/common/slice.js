import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
    loading: false,
    camera: false,
};
export const callTypes = {
    list: "list",
    action: "action"
};
//State işlemleri için
export const Slice = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        catchError: (state, action) => {

            state.error = `${action.type}: ${action.payload.error}`;

            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
                state.actionsLoading = false;
            } else {
                state.actionsLoading = false;
                state.listLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
                state.actionsLoading2 = true;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCamera: (state, action) => {
            state.camera = action.payload
        }

    }
});



