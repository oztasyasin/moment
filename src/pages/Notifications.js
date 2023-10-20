import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import { Text } from 'react-native'
import Header from '../components/Header'
import EmptyData from '../components/EmptyData'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthActions, getAuthSlice } from '../store/_redux/auth/service'
import { isEmpty } from '../helper/isEmpty'
import { useIsFocused } from '@react-navigation/native'
import NotificationRow from '../components/NotificationRow'

const Notifications = ({ navigation }) => {
    const [invites, setInvites] = useState(null);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.auth.notifications);
    const getData = () => {
        dispatch(getAuthActions().getInvites())
            .then((res) => {
                if (res) {
                    dispatch(getAuthSlice().setNotifications(res));
                    setInvites(() => {
                        return res
                    })
                }
            })
    }
    const profilePress = (item) => {
        navigation.navigate('/user', { user: item });
    }
    const accept = (item) => {
        dispatch(getAuthActions().acceptInvite(item?.invite?.id))
            .then((res) => {
                if (res) {
                    getData();
                }
            })
    }
    const decline = (item) => {
        dispatch(getAuthActions().declineInvite(item?.invite?.id))
            .then((res) => {
                if (res) {
                    getData();
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
            <Header />
            {
                isEmpty(invites) ?
                    <EmptyData /> :
                    invites.map((item, i) => {
                        return (
                            <NotificationRow
                                accept={() => accept(item)}
                                decline={() => decline(item)}
                                profilePress={() => profilePress(item)}
                                item={item}
                                key={i} />
                        )
                    })
            }

        </Container>
    )
}

export default Notifications