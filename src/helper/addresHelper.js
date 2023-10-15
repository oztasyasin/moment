import * as Location from 'expo-location';
import { Platform } from 'react-native';
const getAddressStr = (address) => {
    if (Platform.OS == 'android') {
        return `${address?.street}, ${address?.name}, ${address?.subregion}, ${address?.region}, ${address?.country}`
    }
    return `${address?.name}, ${address?.city}, ${address?.region}, ${address?.country}`;
}
export const addressHelper = async (latitude, longitude) => {
    try {
        let addresses = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
        });
        if (addresses.length > 0) {
            let address = getAddressStr(addresses[0])
            const temizlenmisString = address.replace(/ null,/g, '');
            return temizlenmisString;
        }
    } catch (error) {
        return null
    }
};

export const getCurrentPosition = async () => {
    try {
        let location = await Location.getCurrentPositionAsync({});
        return location
    } catch (error) {
        return null
    }
}