import React from 'react'
import BaseModal from './BaseModal'
import { Image, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import Label from '../label/Label'
import { fullWidth, themeGrey, themeRed } from '../../data/staticDatas'
import Button from '../Button'
import FavouriteCards from '../FavouriteCards'
import { getAdaptedWidth } from '../../helper/sizeAdapter'
import { Ionicons } from '@expo/vector-icons';
const PermissionModal = (props) => {
    const { post } = props
    return (
        <BaseModal
            close={() => props.close()}
            visible={props.visible}>
            <Ionicons name="ios-warning" size={100} color={themeRed} />
            <Label
                font={[700, 18, 20]}
                mt={24}
                color={'black'}
                text={"Permission warning!!"} />
            <Label
                style={{ maxWidth: '70%', textAlign: 'center', margin: 32 }}
                mt={12}
                font={[400, 15, 20]}
                color={themeGrey}
                text={"You need to check the application permissions to continue. Please try again after checking the permissions."} />
            {
                props.disableButton ? null :
                    <Button
                        style={{ maxWidth: "90%", minWidth: "90%", margin: 16 }}
                        text={"Ok"}
                        press={() => props.close()}
                        color={'black'} />

            }


        </BaseModal>
    )
}

export default PermissionModal