import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { containerStyles } from '../container/containerStyles'
import { fullHeight } from '../../data/staticDatas'
const FullsizeLoader = () => {
    return (
        <View style={{
            ...containerStyles.view,
            ...styles.frame
        }}>
            <ActivityIndicator color={'white'} size={'large'} />
        </View>
    )
}

export default FullsizeLoader

const styles = StyleSheet.create({
    frame: {
        minHeight: fullHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    }
})