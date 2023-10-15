import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container/Container'
import { globalStyles } from '../styles/globalStyles'
import Row from '../components/row/Row';
import { FlatList, Image, Animated, Easing, ScrollView } from 'react-native';
import { fakePosts, fakeUser, fullHeight, fullWidth, navBarHeight, statusBarHeight, themeGrey } from '../data/staticDatas';
import ProfilePlaces from '../components/ProfilePlaces';
import Label from '../components/label/Label';
import PostItem from '../components/PostITem';
import PostModal from '../components/modals/PostModal';
import { Delete, GetUserPosts, deleteFile, getImageLink, uploadProfilePhoto } from '../firebase/firebase';
import { useIsFocused } from '@react-navigation/native';
import { getAuthSlice, getAuthState } from '../store/_redux/auth/service';
import { useDispatch, useSelector } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
import EditButton from '../components/EditButton';
import { FontAwesome } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import { downloadFile, imagePicker } from '../helper/pickers';
import { CameraView } from '../components/CameraView';
import PpModal from '../components/modals/PpModal';
import LogoutButton from '../components/LogoutButton';
import { persistor } from '../store/Store';
import { getCameraPermission } from '../helper/permissions';
import PermissionModal from '../components/modals/PermissionModal';
import * as Animatable from 'react-native-animatable';
import { shareAsync } from 'expo-sharing';
import uuid from 'react-native-uuid';
import axios from 'axios';
const Profile = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const selectedUser = route?.params?.user;
    const actionSheet = useRef(null);
    const optionArray = ["Use Camera", "From Galery", "Cancel"];
    const [post, setPost] = useState(null);
    const [image, setImage] = useState(null);
    const [share, setShare] = useState(null);
    const [hide, setHide] = useState(false);
    const camera = useSelector((state) => state.common.camera);
    const address = getAuthState().address;
    const addressArr = address?.split(', ');
    const city = address ? addressArr[addressArr?.length - 2] : 'Unknown'
    const [permission, setPermission] = useState(null);
    const top = useState(new Animated.Value(300))[0];
    const [y, setY] = useState(null)
    const selectPost = (item) => {
        navigation.navigate('/postDetails', { post: item })
    }
    const longPressPost = (item) => {

    }
    const openCamera = () => {
        setImage(() => { return null })
        getCameraPermission()
            .then((res) => {
                if (res === 'granted') {
                    dispatch(getCommonSlice().setCamera(true))
                }
                else {
                    setPermission(() => { return "camera" })
                }
            })
    }
    const [posts, setPosts] = useState(null);
    const [pp, setPp] = useState(null);
    const user = getAuthState().user;
    const dispatch = useDispatch();
    const getDetails = (item) => {
        setPost(() => {
            return item
        })
    }
    const deletePost = () => {
        startLoader()
        Delete("post", post.uniqid)
            .then((res) => {
                if (res) {
                    deleteFile(post.id)
                        .then((response) => {
                            if (response) {
                                getData();
                            }
                        })
                }
                setPost(() => {
                    return null
                })
                stopLoader()
            })
    }
    const getData = () => {
        startLoader()
        GetUserPosts(selectedUser ? selectedUser?.id : user?.uid)
            .then((res) => {
                if (res) {
                    setPosts(() => {
                        return res;
                    })
                }
                stopLoader();
            })
    }

    const edit = () => {
        setImage(() => { return null });
        actionSheet.current.show();
    }

    const closeCamera = () => {
        dispatch(getCommonSlice().setCamera(false))
    }
    const getPp = () => {
        getImageLink(`${user?.uid}/profilePhoto`)
            .then((res) => {
                setPp(() => {
                    return res
                })
            })
    }
    const pickImage = async () => {
        imagePicker()
            .then((res) => {
                if (res) {
                    postSelectedImage(res)
                }
            })
    };
    const actionSheetPress = (i) => {
        switch (i) {
            case 0: openCamera(); break;
            case 1: pickImage(); break;
            default: break;
        }
    }
    const postSelectedImage = (file) => {
        if (camera) {
            closeCamera();
        }
        setShare(() => {
            return file;
        })
    }
    const postImage = () => {
        setShare(() => {
            return image;
        })
        dispatch(getCommonSlice().setCamera(false))

    }
    const sharePost = async () => {
        try {
            startLoader();
            const data = {
                ...share
            }
            const response = await axios.get(data.uri, {
                responseType: 'blob',
            });
            if (response.status === 200) {
                const blob = response.data
                uploadProfilePhoto(blob)
                    .then((res) => {
                        if (res) {
                            setPp(() => { return data.uri })
                        }
                        stopLoader();
                        setShare(() => { return null })
                    })
            }
            else {
                stopLoader();
                setShare(() => { return null })

            }
            stopLoader();
        } catch (error) {
            setShare(() => { return null })
            stopLoader();
        }

    }
    const logout = () => {
        dispatch(getAuthSlice().logout())
        persistor.purge()
        navigation.navigate('/login')
    }

    const shareImage = () => {
        const data = { ...post };
        setPost(() => { return null })
        startLoader();
        downloadFile(data.url, uuid.v4())
            .then((res) => {
                stopLoader();
                if (res?.status === 200) {
                    shareAsync(res.uri)
                }
            })
    }
    const startLoader = () => {
        dispatch(getCommonSlice().setLoading(true));
    }
    const stopLoader = () => {
        dispatch(getCommonSlice().setLoading(false));
    }
    const handleScrollTop = () => {
        const toValue = 300;
        setHide(() => { return false })
        Animated.timing(top, {
            toValue,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {

        });
    }

    const handleScrollBegin = (event) => {
        const { contentOffset } = event.nativeEvent;
        const startY = contentOffset.y;
        setY(() => { return startY });
    }
    const handleScrollEnd = (event) => {
        const { contentOffset } = event.nativeEvent;
        const endY = contentOffset.y;
        console.log("başlangıç: " + y + "   bitiş:  " + endY);
        if (y < endY) {
            const toValue = 0;
            setHide(() => { return false })
            Animated.timing(top, {
                toValue,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {

            });
        }
        else {
            const toValue = 300;
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
        if (isFocused) {
            // setPost(() => { return null })
            // getData();
            // if (!pp) {
            //     getPp();
            // }
        }
    }, [isFocused])

    return (
        <Container ignorebottom noscroll>
            <Animated.View style={{ width: fullWidth, height: top }}>
                <Row
                    center
                    vertical
                    style={globalStyles.profileFrame}>
                    <LogoutButton press={() => logout()} />
                    {
                        pp ?
                            <Image
                                style={globalStyles.profileImg}
                                source={{ uri: pp }} /> :
                            <FontAwesome
                                name="user-circle"
                                size={100}
                                color="white" />
                    }

                    <Label
                        mt={8}
                        font={[600, 16, 18]}
                        color={themeGrey}
                        text={`@${user?.custom?.userName}`} />
                    <Row mt={24} center>
                        <ProfilePlaces
                            title={"Posts"}
                            content={posts ? posts?.length : 0} />
                        <ProfilePlaces
                            left
                            title={"Age"}
                            content={fakeUser.age} />
                        <ProfilePlaces
                            left
                            title={"Location"}
                            content={city} />
                    </Row>
                    <EditButton press={() => edit()} />
                </Row>

            </Animated.View>
            <ScrollView
                onScrollBeginDrag={handleScrollBegin}
                onScrollEndDrag={handleScrollEnd}
                style={{ width: fullWidth, marginBottom: navBarHeight + statusBarHeight }}>
                <Row fullSize wrap>
                    {
                        posts?.map((item, i) => {
                            return (
                                <PostItem
                                    key={i}
                                    longPress={() => longPressPost(item)}
                                    press={() => getDetails(item)}
                                    url={item.url} />
                            )
                        })
                    }
                </Row>
            </ScrollView>

            <ActionSheet
                ref={actionSheet}
                title={'Change Profile Photo'}
                options={optionArray}
                cancelButtonIndex={2}
                onPress={(index) => actionSheetPress(index)}
            />
            {
                camera ?
                    <CameraView
                        postSelectedImage={(uri) => postSelectedImage(uri)}
                        postImage={postImage}
                        image={image}
                        setImage={setImage}
                        closeCamera={() => closeCamera()} /> : null
            }
            {
                share != null ?
                    <PpModal
                        close={() => setShare(() => { return null })}
                        image={share}
                        upload={() => sharePost()}
                        visible={share != null}
                    /> : null
            }

            <PostModal
                close={() => setPost(() => { return null })}
                post={post}
                share={() => shareImage()}
                delete={() => deletePost()}
                visible={post != null} />
            <PermissionModal
                close={() => setPermission(() => { return null })}
                visible={permission != null}
            />
        </Container>
    )
}

export default Profile