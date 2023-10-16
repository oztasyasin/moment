import React, { useState } from 'react'
import BaseModal from './BaseModal'
import { Image, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import Label from '../label/Label'
import { fullWidth, themeGrey, themeRed } from '../../data/staticDatas'
import Button from '../Button'
import FavouriteCards from '../FavouriteCards'
import { getAdaptedWidth } from '../../helper/sizeAdapter'

const ApprovePost = (props) => {
    const { post } = props
    return (
        <BaseModal
            close={() => props.close()}
            visible={props.visible}>
            <FavouriteCards now post={post} />
            <Button
                style={{ maxWidth: getAdaptedWidth(320), minWidth: getAdaptedWidth(320) }}
                text={"Share"}
                mb={16}
                press={() => props.sharePost()}
                color={'black'} />

        </BaseModal>
    )
}

export default ApprovePost