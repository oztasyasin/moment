import { getAuthStore } from "../store/_redux/auth/service"

export const getToken = () => {
    return getAuthStore().token;
}