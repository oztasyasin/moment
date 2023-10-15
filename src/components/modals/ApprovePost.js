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
    const [flag, setFlag] = useState(false)
    const press = () => {
        setFlag(() => {
            return true
        })
        props.sharePost()
    }
    const close = () => {
        if (!flag) {
            props.close()
        }
    }
    return (
        <BaseModal
            close={() => close()}
            visible={props.visible}>
            <FavouriteCards now post={post} />
            <Button
                style={{ maxWidth: getAdaptedWidth(320), minWidth: getAdaptedWidth(320) }}
                disabled={flag}
                withLoading
                isLoading={flag}
                text={"Share"}
                mb={16}
                press={() => press()}
                color={'black'} />

        </BaseModal>
    )
}

export default ApprovePost