import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import { Animated, Image, ScrollView, Text } from 'react-native';
import Row from '../components/row/Row';
import { isEmpty } from '../helper/isEmpty';
import Label from '../components/label/Label';
import ProfilePlaces from '../components/ProfilePlaces';
import { fullWidth, navBarHeight, statusBarHeight, themeGrey } from '../data/staticDatas';
import { globalStyles } from '../styles/globalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { getPp, ppHelper } from '../helper/ppHelper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as postActions from '../store/_redux/post/action';
import PostITem from '../components/PostITem';
import EmptyData from '../components/EmptyData';
import PostModal from '../components/modals/PostModal';
import BackButton from '../components/BackButton';
const User = ({ route }) => {
    const user = route?.params?.user;
    const [posts, setPosts] = useState(null);
    const dispatch = useDispatch();
    const [hide, setHide] = useState(false);
    const top = useState(new Animated.Value(0))[0];
    const [y, setY] = useState(null)
    const [post, setPost] = useState(null);
    const getDetails = (item) => {
        setPost(() => {
            return item
        })
    }
    const handleScrollBegin = (event) => {
        const { contentOffset } = event.nativeEvent;
        const startY = contentOffset.y;
        setY(() => { return startY });
    }
    const handleScrollEnd = (event) => {
        const { contentOffset } = event.nativeEvent;
        const endY = contentOffset.y;
        if (y < endY) {
            const toValue = -295;
            setHide(() => { return true })
            Animated.timing(top, {
                toValue,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
            });
        }
        else {
            const toValue = 0;
            setHide(() => { return false })
            Animated.timing(top, {
                toValue,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
            });
        }
    }
    useEffect(() => {
        dispatch(postActions.GetByUserId(user?.user?.id))
            .then((res) => {
                if (res) {
                    setPosts(() => {
                        return res
                    })
                }
            });
    }, [])

    return (
        <Container noscroll>
            <Row
                center
                vertical
                style={globalStyles.profileFrame}>
                <BackButton />
                {
                    !isEmpty(user?.user?.photoUrl) ?
                        <Image
                            style={globalStyles.profileImg}
                            source={{ uri: getPp(user?.user?.id) }} /> :
                        <FontAwesome
                            name="user-circle"
                            size={100}
                            color="white" />
                }

                <Label
                    mt={8}
                    font={[600, 16, 18]}
                    color={themeGrey}
                    text={`@${user?.user?.userName}`} />
                <Row mt={24} style={{ maxWidth: 390 }} center>
                    <ProfilePlaces
                        title={"Posts"}
                        content={posts ? posts?.length : 0} />
                </Row>
            </Row>
            <ScrollView
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                style={{ width: fullWidth, marginBottom: statusBarHeight }}>
                {
                    !isEmpty(posts) ?
                        <Row fullSize wrap>
                            {
                                posts?.map((item, i) => {
                                    return (
                                        <PostITem
                                            key={i}
                                            longPress={() => longPressPost(item)}
                                            press={() => getDetails(item)}
                                            url={ppHelper(item.photoUrl)} />
                                    )
                                })
                            }
                        </Row> :
                        <EmptyData />
                }

            </ScrollView>
            {
                post ?
                    <PostModal
                        close={() => setPost(() => { return null })}
                        post={post}
                        visible={post != null} /> : null
            }
        </Container>
    )
}

export default User