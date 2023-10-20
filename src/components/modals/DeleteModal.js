import React from 'react'
import BaseModal from './BaseModal'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import Label from '../label/Label'
import { themeGrey, themeRed } from '../../data/staticDatas'
import Button from '../Button'
import FavouriteCards from '../FavouriteCards'
import { getAuthState } from '../../store/_redux/auth/service'
import Row from '../row/Row'
import Logo from '../svg/Logo'
import { Ionicons } from '@expo/vector-icons';
import { getAdaptedWidth } from '../../helper/sizeAdapter'
const DeleteModal = (props) => {
    const { post } = props
    return (
        <BaseModal
            close={() => props.close()}
            visible={props.visible}>
            <Ionicons
                style={{ marginTop: 32 }}
                name="trash"
                size={100}
                color={themeRed} />
            <Label
                font={[700, 22, 24]}
                color={'black'}
                text={"Delete alert"} />
            <Label
                font={[400, 16, 20]}
                color={themeGrey}
                style={{ maxWidth: '70%', marginHorizontal: 32, textAlign: 'center',margin:12 }}
                text={"Are you sure you want to permanently delete the selected data?"} />
            <Button
                style={{ maxWidth: '80%', minWidth: '80%', marginHorizontal:32}}
                text={"Delete"}
                mb={16}
                mt={16}
                press={() => props.delete()}
                color={themeRed} />
        </BaseModal>
    )
}

export default DeleteModal