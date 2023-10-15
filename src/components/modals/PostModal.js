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
import { Ionicons } from '@expo/vector-icons';
import Logo from '../svg/Logo'
const PostModal = (props) => {
    const { post } = props
    return (
        <BaseModal
            close={() => props.close()}
            visible={props.visible}>
            <FavouriteCards nopadding post={post} />
            {
                getAuthState()?.user?.uid === post?.userId ?
                    <>
                        <Row ph={16} pv={12} end fullSize>
                            <View style={{ flex: 1 }}>
                                <Logo color={'black'} />
                            </View>
                            <TouchableOpacity onPress={() => props.share()}>
                                <Ionicons name="share-social-sharp" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.delete()} style={{ marginLeft: 16 }}>
                                <Ionicons name="md-trash" size={30} color={themeRed} />
                            </TouchableOpacity>
                        </Row>
                    </>
                    : null
            }

        </BaseModal>
    )
}

export default PostModal