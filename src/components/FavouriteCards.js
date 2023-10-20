import React, { useEffect, memo, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { themeGrey, themeRed } from '../data/staticDatas'
import Label from '../components/label/Label';
import Row from '../components/row/Row';
import { dateDistance } from '../helper/dateDistance';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Logo from './svg/Logo';
import { getPp, ppHelper } from '../helper/ppHelper';
import { isEmpty } from '../helper/isEmpty';
import axios from 'axios';
const FavouriteCards = (props) => {
    const navigation = useNavigation();
    const { post, now } = props;
    const today = new Date();
    const postDate = new Date(post.date);
    const zamanFarki = dateDistance(today, postDate);
    const [pp, setPp] = useState(null);
    const goProfile = () => {

    }
    useEffect(() => {
        axios.get(getPp(post.userId))
            .then((res) => {
                if (!res.data) {
                    setPp(() => { return null })
                }
                else{
                    setPp(() => { return "dasdsa" })
                }
            })

    }, [])

    return (
        <View style={{
            ...globalStyles.favouriteFrame,
            paddingBottom: props.nopadding ? 0 : 32
        }}>
            <Row split style={{ paddingHorizontal: 16 }}>
                {
                    !now ?
                        <TouchableOpacity onPress={() => goProfile()} style={globalStyles.postProfile}>
                            {
                                !isEmpty(pp) ?
                                    <Image
                                        style={globalStyles.favouritePp}
                                        source={{ uri: getPp(post.userId) }} /> :
                                    <FontAwesome
                                        name="user-circle"
                                        size={40}
                                        color={themeGrey} />
                            }
                            <Label font={[600, 12, 14]} style={{ marginLeft: 8 }} color={themeGrey} text={`@${post?.userName}`} />
                        </TouchableOpacity> :
                        <Logo color={'black'} />
                }

                <Label font={[400, 12, 14]} color={themeGrey} style={{ flex: 1, textAlign: 'right' }} text={`${now !== true ? zamanFarki : 'now'}`} />
            </Row>
            <Row end mb={6} style={{ paddingHorizontal: 16 }}>
                <Label
                    style={{ marginRight: 6 }}
                    font={[400, 10, 12]}
                    color={themeGrey}
                    text={post.address} />
                <Ionicons name="location" size={16} color={themeRed} />
            </Row>
            <Image
                style={globalStyles.favouriteImg}
                source={{ uri: now ? post.url : ppHelper(post.photoUrl) }} />
        </View>
    )
}

export default memo(FavouriteCards)