import React, { memo, useEffect, useState } from 'react'
import Row from './row/Row'
import LogoutButton from './LogoutButton'
import Label from './label/Label'
import ProfilePlaces from './ProfilePlaces'
import EditButton from './EditButton'
import { getPp } from '../helper/ppHelper'
import { isEmpty } from '../helper/isEmpty'
import { globalStyles } from '../styles/globalStyles'
import { themeGrey } from '../data/staticDatas'
import { FontAwesome } from '@expo/vector-icons'
import { Image, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
const ProfileHeader = (props) => {
    const { user, posts, friends, city } = props;
    const navigation = useNavigation();
    return (
        <Row
            center
            vertical
            style={globalStyles.profileFrame}>
            <LogoutButton press={() => props.logout()} />

            <TouchableOpacity onPress={() => props.edit()}>
                {
                    !isEmpty(user?.profilePhoto) ?
                        <Image
                            style={globalStyles.profileImg}
                            source={{ uri: getPp(user?.id) }} /> :
                        <FontAwesome
                            name="user-circle"
                            size={100}
                            color="white" />
                }
                <EditButton press={() => props.edit()} />
            </TouchableOpacity>

            <Label
                mt={8}
                font={[600, 16, 18]}
                color={themeGrey}
                text={`@${user?.userName}`} />
            <Row mt={24} style={{ maxWidth: 390 }} center>
                <ProfilePlaces
                    disabled
                    press={() => { }}
                    title={"Posts"}
                    content={posts ? posts?.length : 0} />
                <ProfilePlaces
                    left
                    press={() => navigation.navigate('/friends')}
                    title={"Friends"}
                    content={friends ? friends?.length : 0} />
                <ProfilePlaces
                    left
                    press={() => navigation.navigate('/map')}
                    title={"Location"}
                    content={city} />
            </Row>
            <TouchableOpacity
                onPress={() => navigation.navigate('/addUser')}
                style={globalStyles.addUsersButton}>
                <AntDesign name="addusergroup" size={28} color="white" />
            </TouchableOpacity>
        </Row>
    )
}

export default memo(ProfileHeader)