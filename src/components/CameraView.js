import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { fullHeight, fullWidth } from '../data/staticDatas';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { imagePicker } from '../helper/pickers';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import Logo from './svg/Logo';
export function CameraView(props) {
    const cameraRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [permit, setPermit] = useState(false);
    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            if (type != Camera.Constants.Type.back) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    newphoto.uri,
                    [{ flip: ImageManipulator.FlipType.Horizontal }],
                    { format: 'png' }
                );
                props.setImage(() => { return manipResult })
            }
            props.setImage(() => { return photo })

        }
    };
    const pickImage = () => {
        imagePicker()
            .then((res) => {
                if (res) {
                    props.setImage(() => { return res })
                }
            })
    }
    useEffect(() => {
        Camera.requestCameraPermissionsAsync()
            .then((res) => {
                setPermit(() => { return res.status == 'granted' })
            })
    }, [])

    return (

        <View style={globalStyles.cameraViewFrame}>
            {
                props.image && permit ?
                    <>
                        <View style={{
                            ...globalStyles.cameraTools,
                            paddingVertical: 21
                        }}>
                            <Logo color={'white'} />
                        </View>
                        <Image style={{
                            ...globalStyles.capturedImage,
                        }} source={props.image} />
                        <View style={{
                            ...globalStyles.cameraTools,
                            width: fullWidth,
                            minHeight: 200,
                            paddingHorizontal: 48,
                        }}>

                            <TouchableOpacity
                                onPress={() => props.setImage(() => { return null })}
                                style={globalStyles.galeryButton}>
                                <Ionicons name="close" size={42} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.postImage()}
                                style={globalStyles.galeryButton}>
                                <Ionicons name="checkmark" size={42} color="white" />
                            </TouchableOpacity>
                        </View>
                    </> :
                    !props.image && permit ?
                        <>
                            <View style={{
                                ...globalStyles.cameraTools,
                                justifyContent: 'space-between',
                                paddingVertical: 16
                            }}>
                                <Logo color={'white'} />
                                <TouchableOpacity onPress={() => props.closeCamera()}>
                                    <Ionicons name="close" size={42} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Camera
                                style={{ height: fullWidth, aspectRatio: 1}}
                                type={type}
                                ref={cameraRef}
                            />
                            <View style={{
                                ...globalStyles.cameraTools,
                                width: fullWidth,
                                minHeight: 200,
                                paddingHorizontal: 48,
                                justifyContent: 'space-between'

                            }}>
                                <TouchableOpacity onPress={() => pickImage()}>
                                    <MaterialIcons name="image" size={42} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => takePicture()} style={globalStyles.capture}>
                                    <View style={globalStyles.captureInside} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setType((current) => { return current !== Camera.Constants.Type.front ? Camera.Constants.Type.front : Camera.Constants.Type.back })}>
                                    <MaterialIcons name="flip-camera-ios" size={42} color="white" />
                                </TouchableOpacity>
                            </View>
                        </> : null
            }

        </View >
    );
}

export default CameraView;
