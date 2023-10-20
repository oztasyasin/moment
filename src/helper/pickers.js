import * as DocumentPicker from 'expo-document-picker';
import { imageName } from '../data/staticDatas';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const imagePicker = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled) {
            return result?.assets[0]
        }
        return null
    } catch (error) {
        return null
    }
};

export const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
        });
        if (result?.assets?.length != 0) {
            return result.assets[0]
        }
        return null
    } catch (error) {
        return null
    }
};
const getFixedFileName = (fileName) => {
    return fileName.toLowerCase().replaceAll(' ', '_').replace(/[^A-Za-z\s]/g, '');
}
export const downloadFile = async (uri, name) => {
    try {
        const fileUri = `${FileSystem.documentDirectory}${imageName}_${getFixedFileName(name)}.jpg`
        const result = await FileSystem.downloadAsync(
            uri,
            fileUri
        );

        return result
    } catch (error) {
        return null
    }
}

export const formatImage = async (uri) => {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 500, height: 500 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult
    } catch (error) {
        return uri
    }
}

export const formatPp = async (uri) => {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 300, height: 300 } }],
            { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult
    } catch (error) {
        return uri

    }
}