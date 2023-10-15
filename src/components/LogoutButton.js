import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { themeRed } from '../data/staticDatas';
const LogoutButton = (props) => {
    return (
        <TouchableOpacity style={globalStyles.logoutButton} onPress={() => props.press()}>
            <SimpleLineIcons name="logout" size={24} color={themeRed} />
        </TouchableOpacity>
    )
}

export default memo(LogoutButton)