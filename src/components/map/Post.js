import React, { memo } from 'react'
import { View, Image } from 'react-native'
import { globalStyles } from '../../styles/globalStyles';

const Post = (props) => {
    const { item } = props;
    return (
        <View style={globalStyles.mapPost}>
            <Image style={globalStyles.mapPostImage} source={{ uri: item.url }} />
        </View>
    )
}

export default memo(Post)