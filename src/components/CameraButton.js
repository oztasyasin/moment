import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Label from './label/Label';
import { globalStyles } from '../styles/globalStyles';
const CameraButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.press()}
            style={globalStyles.cameraButton}>
            <MaterialCommunityIcons name="camera-marker" size={32} color="white" />
            {/* <Label font={[600, 16, 18]} color={'white'} text={'Capture the Moment'} /> */}
        </TouchableOpacity>
    )
}

export default CameraButton