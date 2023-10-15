import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
    user: null,
    token: null,
    location: null,
    address: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};
//State işlemleri için
export const Slice = createSlice({
    name: "auth",
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
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        logout: (state) => {
            state.address = null;
            state.user = null;
            state. token = null;
            state. location = null;
        },
    }
});



