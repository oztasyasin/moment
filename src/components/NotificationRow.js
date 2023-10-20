import React, { memo, useEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { getPp } from '../helper/ppHelper';
import Label from './label/Label';
import { themeGreen, themeGrey, themeRed } from '../data/staticDatas';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { isEmpty } from '../helper/isEmpty';
const NotificationRow = (props) => {
    const { item } = props;

    return (
        <View style={globalStyles.notificationRow}>
            <TouchableOpacity
                onPress={() => props.profilePress()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    isEmpty(item?.user?.photoUrl) ?
                        <FontAwesome
                            name="user-circle"
                            size={50}
                            color="black" /> :
                        <Image style={globalStyles.notificationRowPp}
                            source={{ uri: getPp(item?.user?.id) }} />
                }

                <View style={{ marginLeft: 12 }}>
                    <Label
                        font={[600, 16, 20]}
                        color={'black'}
                        text={`@${item.user.userName}`} />
                    <Label
                        ml={4}
                        font={[400, 12, 15]}
                        color={themeGrey}
                        text={`wants to follow you`} />
                </View>

            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.accept()}>
                    <Ionicons name="ios-checkbox" size={32} color={themeGreen} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.decline()} style={{ marginLeft: 24 }}>
                    <Ionicons name="trash" size={32} color={themeRed} />
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default memo(NotificationRow)