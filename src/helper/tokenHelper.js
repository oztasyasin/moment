import store from "../store/Store";
export const getToken = () => {
    const authState = store.getState().auth;
    return authState.token;
}