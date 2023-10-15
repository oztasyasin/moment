import React, { memo } from 'react'
import BaseModal from './BaseModal'
import { Image } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import Button from '../Button'
import { getAdaptedWidth } from '../../helper/sizeAdapter'

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
                press={() => props.upload(image?.uri)}
                color={'black'} />

        </BaseModal>
    )
}

export default memo(PpModal)