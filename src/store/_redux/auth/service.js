import * as slice from './slice';
import * as actions from './action';
import store from '../../Store';

export const getAuthSlice = () => {
    return slice.Slice.actions;
}

export const getAuthActions = () => {
    return actions;
}

export const getAuthState = () => {
    const authStore = store.getState().auth;
    return authStore;
}

