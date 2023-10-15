import React, { useRef, useState } from 'react'
import Container from '../components/container/Container'
import { Image, Text, View } from 'react-native';
import Mapper from '../components/map/Mapper';
import Row from '../components/row/Row';
import { globalStyles } from '../styles/globalStyles';
import { useEffect } from 'react';
import Label from '../components/label/Label';
import { addressHelper } from '../helper/addresHelper';
import { fullHeight } from '../data/staticDatas';
import Constants from 'expo-constants';
const PostDetails = ({ navigation, route }) => {
    const post = route?.params?.post;
    const [location, setLocation] = useState({ latitude: post.latitude, longitude: post.longitude })
    const [address, setAddress] = useState(null)
    const frameRef = useRef();
    const [mH, setMh] = useState(0);
    const statusBarHeight = Constants.statusBarHeight;
    const setMaxHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setMh(() => {
            return fullHeight - height - statusBarHeight;
        });
    };
    useEffect(() => {
        addressHelper(location.latitude, location.longitude)
            .then((res) => {
                setAddress(() => {
                    return res;
                })
            })
    }, [])

    return (
        <Container noscroll>

            <View style={{ flex: 1, maxHeight: fullHeight - statusBarHeight }}>
                <Mapper
                    post={post}
                    address={address}
                    setAddress={setAddress}
                    findLocation
                    requestPage
                    location={location}
                    setLocation={setLocation}
                />
            </View>
        </Container>
    )
}

export default PostDetails