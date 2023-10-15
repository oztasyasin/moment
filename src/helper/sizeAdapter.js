import { fullWidth } from "../data/staticDatas";

const baseWidth = 390;

export const getAdaptedWidth = (size) => {
    return (fullWidth * size) / baseWidth;
}