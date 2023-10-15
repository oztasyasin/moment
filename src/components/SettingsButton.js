import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import { Feather } from '@expo/vector-icons';
const SettingsButton = (props) => {
    return (
        <TouchableOpacity
            onPress={()=>props.press()}
            style={globalStyles.settingsButton}>
            <Feather
                name="settings"
                size={24}
                color="white" />
        </TouchableOpacity>
    )
}

export default memo(SettingsButton)