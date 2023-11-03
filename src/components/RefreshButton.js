import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { Ionicons } from '@expo/vector-icons';
const RefreshButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.press()}
            style={globalStyles.refreshButton}>
            <Ionicons name="refresh" size={32} color="white" />
        </TouchableOpacity>
    )
}

export default memo(RefreshButton)