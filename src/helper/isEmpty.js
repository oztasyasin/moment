export const isEmpty = (data) => {
    return data == "apiundefined" || data == null || data.length == 0 || typeof data === 'undefined' || data == NaN || data == ""
}