import { Platform, StyleSheet } from "react-native";
import { fullHeight, fullWidth, navBarHeight, statusBarHeight, themeGrey, useableScreenSize } from "../data/staticDatas";
import { getAdaptedWidth } from "../helper/sizeAdapter";
export const globalStyles = StyleSheet.create({
    buttonFrame: {
        width:'100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'black',
        textAlign:'center',
        maxWidth: 500,
        
    },
    profileFrame: {
        backgroundColor: 'black',
        minWidth: fullWidth,
        paddingHorizontal: 16,
        paddingVertical: 48,
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    profilePlaces: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    postItems: {
        minWidth: fullWidth / 3,
        minHeight: fullWidth / 3,
        borderWidth: 1,
        borderColor: 'white'
    },
    postDetailsImg: {
        width: '100%',
        aspectRatio: 1.5,
        maxHeight: 300
    },
    postAddress: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        zIndex: 10,
        width: fullWidth,
        textAlign: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24
    },
    markerImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    },
    mapPost: {
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white'
    },
    mapPostImage: {
        width: 100,
        height: 100
    },
    postModalImg: {
        width: '100%',
        aspectRatio: 1.5,
        borderRadius: 12,

    },
    favouriteFrame: {
        width: fullWidth,
        paddingVertical: 24,
        backgroundColor: 'white',
    },
    favouriteImg: {
        width: '100%',
        aspectRatio: 1.5,
    },
    favouritePp: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    header: {
        minWidth: fullWidth,
        paddingVertical: 16,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    cameraButton: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    cameraViewFrame: {
        minWidth: fullWidth,
        height: fullHeight,
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'black',
    },
    cameraTools: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
        justifyContent: 'space-between'
    },
    galeryButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    capture: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captureInside: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: 'white'
    },
    closeBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    capturedImage: {
        maxWidth: fullWidth,
        maxHeight: fullHeight * 0.65
    },
    settingsButton: {
        position: 'absolute',
        top: 32,
        right: 32
    },
    profileIcon: {

    },
    ppModalImage: {
        margin: 16,
        width: getAdaptedWidth(320),
        maxHeight: getAdaptedWidth(320),
        aspectRatio:1,
        borderRadius: 12
    },
    postProfile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoutButton: {
        position: 'absolute',
        top: 32,
        left: 32
    }
})