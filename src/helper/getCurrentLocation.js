import { addressHelper } from "./addresHelper";

export const getCurrentCity = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return null
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            const address = await addressHelper(location.coords.latitude, location.coords.longitude)
            return address.split(',')[0];
        }
    } catch (error) {
        return null
    }
}