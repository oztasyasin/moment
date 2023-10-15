import React from 'react'
import { TouchableOpacity } from 'react-native'
import { fullHeight, fullWidth } from '../data/staticDatas'

const BackpressHandler = (props) => {
    return (
        <TouchableOpacity onPress={() => props.press()} style={{ position: 'absolute', minWidth: fullWidth, minHeight: fullHeight, zIndex: -2, top: 0, left: 0 }} />
    )
}

export default BackpressHandler