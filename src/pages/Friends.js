import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container/Container'
import Header from '../components/Header'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getAuthActions } from '../store/_redux/auth/service'
import { getCommonSlice } from '../store/_redux/common/service'
import { isEmpty } from '../helper/isEmpty'
import EmptyData from '../components/EmptyData'
import { FlatList } from 'react-native'
import { fullWidth, statusBarHeight } from '../data/staticDatas'
import UserRow from '../components/UserRow'
import { useToast } from 'react-native-toast-notifications'

const Friends = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [friends, setFriends] = useState(null);
    const dispatch = useDispatch();
    const toast = useToast();
    const [isRefreshing, setRefreshing] = useState(false);
    const startLoader = () => {
        dispatch(getCommonSlice().setLoading(true));
    }
    const stopLoader = () => {
        dispatch(getCommonSlice().setLoading(false));
    }
    const getData = () => {
        startLoader();
        dispatch(getAuthActions().getFriends())
            .then((res) => {
                if (res) {
                    setFriends(() => {
                        return res
                    })
                }
                setRefreshing(() => { return false });
                stopLoader();
            })
    }
    const refresh = () => {
        setRefreshing(() => { return true });
        getData();
    }
    const profilePress = (item) => {
        navigation.navigate('/user', { user: { user: item } });
    }
    const deleteFriend = (item) => {
        dispatch(getAuthActions().deleteFriendship(item.id))
            .then((res) => {
                if (res) {
                    getData();
                    toast.show("Unfriending process completed successfully")
                }
                else {
                    toast.show("Something went wrong")
                }
            })
    }
    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused])

    return (
        <Container noscroll>
            <Header hasBackButton />
            {
                isEmpty(friends) ?
                    <EmptyData /> :
                    <FlatList
                        refreshing={false}
                        onRefresh={() => refresh()}
                        style={{ width: fullWidth, maxWidth: fullWidth, marginBottom: statusBarHeight }}
                        data={friends}
                        renderItem={({ item }) => {
                            return (
                                <UserRow
                                    friend
                                    profilePress={() => profilePress(item)}
                                    deleteFriend={() => deleteFriend(item)}
                                    user={item} />
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
            }
        </Container>
    )
}

export default Friends