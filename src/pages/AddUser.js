import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Header from '../components/Header'
import { FlatList, Text } from 'react-native'
import { isEmpty } from '../helper/isEmpty'
import EmptyData from '../components/EmptyData'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getAuthActions, getAuthState } from '../store/_redux/auth/service'
import UserRow from '../components/UserRow'
import { fullWidth, statusBarHeight } from '../data/staticDatas'
import { useToast } from 'react-native-toast-notifications'
import { getCommonSlice } from '../store/_redux/common/service'

const AddUser = ({ navigation }) => {
    const [users, setUsers] = useState(null);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const toast = useToast();
    const startLoader = () => {
        dispatch(getCommonSlice().setLoading(true));
    }
    const stopLoader = () => {
        dispatch(getCommonSlice().setLoading(false));
    }
    const getData = () => {
        startLoader();
        dispatch(getAuthActions().getUsers())
            .then((res) => {
                if (res) {
                    setUsers(() => {
                        return res
                    })
                    stopLoader();
                }
            })
    }
    const sendInvite = (item) => {
        startLoader();
        dispatch(getAuthActions().sendInvite({
            userId: getAuthState().user.id,
            friendId: item.id
        }))
            .then((res) => {
                if (res) {
                    getData();
                    toast.show("Friend request sent successfully")
                }
                else {
                    toast.show("something went wrong")
                }
            })
        stopLoader();
    }
    const profilePress = (item) => {
        navigation.navigate('/user', { user: item });
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
                isEmpty(users) ?
                    <EmptyData /> :
                    <FlatList
                        refreshing={false}
                        onRefresh={() => getData()}
                        style={{ width: fullWidth, maxWidth: fullWidth, marginBottom: statusBarHeight }}
                        data={users}
                        renderItem={({ item }) => {
                            return (
                                <UserRow
                                    profilePress={() => { }}
                                    sendInvite={() => sendInvite(item)}
                                    user={item} />
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
            }

        </Container>
    )
}

export default AddUser