import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { View } from 'react-native';
const EditButton = (props) => {
    return (
        <View
            style={globalStyles.settingsButton}>
            <MaterialIcons name="edit" size={20} color="white" />
        </View>
    )
}

export default EditButton