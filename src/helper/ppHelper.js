import { getCommonState } from "../store/_redux/common/service";

export const ppHelper = (pp) => {
    if (pp == null) {
        return null
    }
    if (pp.startsWith("api")) {
        return `${getCommonState().url}/${pp}`
    }
    return pp;
}

export const getPureUrl = (url) => {
    return `api${url?.split('api')[1]}`;
}