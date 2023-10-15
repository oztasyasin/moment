import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
export async function convertToBase64(imageUri) {
    try {
        // const resizedImage = await ImageManipulator.manipulateAsync(
        //     imageUri,
        //     [],
        //     { compress: 1, format: 'jpeg', base64: false, maxWidth: 1500, maxHeight: 1000 }
        // );
        const base64Photo = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64Photo;
    } catch (error) {
        return null
    }

}