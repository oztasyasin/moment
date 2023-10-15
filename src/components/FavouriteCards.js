import React, { useEffect, useState, Fragment, memo } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { fakePosts, fakeUser, themeGrey, themeRed } from '../data/staticDatas'
import Label from '../components/label/Label';
import { addressHelper } from '../helper/addresHelper';
import Row from '../components/row/Row';
import { dateDistance } from '../helper/dateDistance';
import { Ionicons } from '@expo/vector-icons';
import { GetUser, getImageLink } from '../firebase/firebase';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Logo from './svg/Logo';
const FavouriteCards = (props) => {
    const navigation = useNavigation();
    const { post, now } = props;
    const [address, setAddress] = useState(post.address);
    const today = new Date();
    const postDate = new Date(post.date);
    const zamanFarki = dateDistance(today, postDate);
    const [url, setUrl] = useState(null);
    const [pp, setPp] = useState(null);
    const [user, setUser] = useState(null);
    const goProfile = () => {
        // navigation.navigate('/profile')
        
    }
    useEffect(() => {
        if (address == null || typeof address === 'undefined') {
            addressHelper(post.latitude, post.longitude)
                .then((res) => {
                    setAddress(() => {
                        return res
                    })
                })
        }
        getImageLink(`${post.fileName}`)
            .then((res) => {
                if (res) {
                    setUrl(() => { return res })
                }
            })
        getImageLink(`${post.userId}/profilePhoto`)
            .then((res) => {
                if (res) {
                    setPp(() => {
                        return res
                    })
                }
            })
        GetUser(post?.userId)
            .then((res) => {
                if (res) {
                    setUser(() => { return res })
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
                                pp ?
                                    <Image style={globalStyles.favouritePp} source={{ uri: pp }} /> :
                                    <FontAwesome
                                        name="user-circle"
                                        size={40}
                                        color={themeGrey} />
                            }
                            {
                                user ?
                                    <Label font={[600, 12, 14]} style={{ marginLeft: 8 }} color={themeGrey} text={`@${user?.userName}`} /> : null
                            }
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
                    text={address ? address : post.address} />
                <Ionicons name="location" size={16} color={themeRed} />
            </Row>
            <Image
                style={globalStyles.favouriteImg}
                source={{ uri: url ? url : post.url }} />
        </View>
    )
}

export default memo(FavouriteCards)