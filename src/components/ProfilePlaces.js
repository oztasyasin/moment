import React, { memo } from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import Label from '../components/label/Label';
import { themeGrey } from '../data/staticDatas';
const ProfilePlaces = (props) => {
    return (
        <View style={{
            ...globalStyles.profilePlaces,
            borderStyle: 'solid',
            borderLeftWidth: props.left ? 1 : 0,
            borderColor: themeGrey
        }}>
            <Label text={props.title} color={'white'} font={[700, 20, 22]} />
            <Label mt={12} text={props.content} color={themeGrey} font={[500, 15, 16]} />
        </View>
    )
}

export default memo(ProfilePlaces)