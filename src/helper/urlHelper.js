import { getCommonState } from "../store/_redux/common/service";


export const getUrl = () => {
    return getCommonState().url;
}