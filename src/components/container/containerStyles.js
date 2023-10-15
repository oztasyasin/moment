import { Dimensions, Platform, StyleSheet } from "react-native";
import { fullHeight, themeDark } from "../../data/staticDatas";
import Constants from 'expo-constants';
export const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeDark,
    },
    scroll: {
        minWidth: '100%',
        minHeight: Dimensions.get('window').height,
    },
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        minHeight: Dimensions.get('window').height,
        backgroundColor:'white'
    }
})