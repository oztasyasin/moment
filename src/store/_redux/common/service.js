import * as slice from './slice';
import * as actions from './action';
import store from '../../Store';

export const getCommonSlice = () => {
    return slice.Slice.actions;
}

export const getCommonActions = () => {
    return actions;
}

export const getCommonState = () => {
    return store.getState().common;
}
