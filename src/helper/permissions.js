import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

export const getCameraPermission = async () => {
    try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        return status
    } catch (error) {
        return null
    }
}

export const getLocationPermission = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status
    } catch (error) {
        return null
    }
}