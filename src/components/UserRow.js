import React, { memo, useEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { getPp } from '../helper/ppHelper';
import Label from './label/Label';
import { themeGreen, themeGrey, themeRed } from '../data/staticDatas';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { isEmpty } from '../helper/isEmpty';
const UserRow = (props) => {
    const { user } = props;
    return (
        <View style={globalStyles.notificationRow}>
            <TouchableOpacity
                onPress={() => props.profilePress()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    isEmpty(user.photoUrl) ?
                        <FontAwesome
                            name="user-circle"
                            size={50}
                            color="black" /> :
                        <Image style={globalStyles.notificationRowPp}
                            source={{ uri: getPp(user?.id) }} />
                }
                <View style={{ marginLeft: 12 }}>
                    <Label
                        font={[600, 16, 20]}
                        color={'black'}
                        text={`@${user.userName}`} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.sendInvite()}>
                <AntDesign name="adduser" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default UserRow