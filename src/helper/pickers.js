import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { imageName } from '../data/staticDatas';

export const imagePicker = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
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
        console.error(error);
        return null
    }
}