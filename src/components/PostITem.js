import React, { memo } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles'

const PostItem = (props) => {
    return (
        <TouchableOpacity
            onLongPress={() => props.longPress()}
            onPress={() => props.press()}>
            <Image
                style={globalStyles.postItems}
                source={{ uri: props.url }} />
        </TouchableOpacity>
    )
}

export default memo(PostItem)