export const prepareImg = async (uri) => {
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response)
            }
            xhr.onerror = (e) => {
                reject(new TypeError('Network request failed'))
            }
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        })
        return blob
    } catch (error) {
        return null
    }

}