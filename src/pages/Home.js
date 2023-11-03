import React, { useEffect, useState } from 'react'
import { FlatList, Platform, Text, View } from 'react-native'
import { fakePosts, fullWidth } from '../data/staticDatas';
import { addressHelper } from '../helper/addresHelper';
import Container from '../components/container/Container';
import FavouriteCards from '../components/FavouriteCards';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
import { useIsFocused } from '@react-navigation/native';
import { getAuthState } from '../store/_redux/auth/service';
import Constants from 'expo-constants';
import * as postActions from '../store/_redux/post/action';
import { Get } from '../firebase/firebase';
import { isEmpty } from '../helper/isEmpty';
import EmptyData from '../components/EmptyData';
import { useToast } from 'react-native-toast-notifications';
// const Container = lazy(() => import('../components/container/Container'));
// const FavouriteCards = lazy(() => import('../components/FavouriteCards'));
// const Header = lazy(() => import('../components/Header'));

const Home = () => {
    const [posts, setPosts] = useState();
    const isFocused = useIsFocused();
    const [refreshing, setRefresh] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const renderItem = ({ item }) => {
        return (
            <FavouriteCards post={item} />
        )
    };
    const getData = () => {
        dispatch(getCommonSlice().setLoading(true))
        dispatch(postActions.GetAll())
            .then((res) => {
                if (res != null && res != 429) {
                    setPosts(() => {
                        return res
                    })
                }
                dispatch(getCommonSlice().setLoading(false))
                setRefresh(() => { return false })
            })
    }
    const refresh = () => {
        setRefresh(() => { return true })

        getData();
    }
    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused])

    return (
        <Container noscroll ignorebottom >
            <Header />
            {
                isEmpty(posts) ?
                    <EmptyData /> :
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={() => refresh()}
                        style={{ minWidth: fullWidth, flex: 1, marginBottom: Platform.OS == 'android' ? 40 + Constants.statusBarHeight : 80 + Constants.statusBarHeight }}
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
            }

        </Container>
    )
}

export default Home