import React, { memo } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { getAdaptedWidth } from '../../helper/sizeAdapter'
import BackpressHandler from '../BackpressHandler'
// import FullsizeHandler from '../../fullSizeHandler/FullsizeHandler';
const BaseModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                props.close()
            }}>
            <View style={defaults.centeredView}>
                <BackpressHandler press={() => props.close()} />
                <View style={{ ...defaults.modalView, }}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}

export default memo(BaseModal)
const defaults = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
        position: 'relative',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        width: 'auto',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "auto",
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});