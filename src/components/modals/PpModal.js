import React, { memo, useState } from 'react'
import BaseModal from './BaseModal'
import { ActivityIndicator, Image } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import Button from '../Button'
import { getAdaptedWidth } from '../../helper/sizeAdapter'
import { themeGrey } from '../../data/staticDatas'

const PpModal = (props) => {
    const { image } = props
    return (
        <BaseModal
            close={() => props.close()}
            visible={props.visible}>
            <Image style={globalStyles.ppModalImage} source={{ uri: image?.uri }} />
            <Button
                style={{ maxWidth: getAdaptedWidth(320), minWidth: getAdaptedWidth(320) }}
                text={"Upload"}
                mb={16}
                press={() => props.upload()}
                color={'black'} />
        </BaseModal>
    )
}

export default memo(PpModal)