import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { TouchableOpacity } from 'react-native';
const EditButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.press()}
            style={globalStyles.settingsButton}>
            <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default EditButton