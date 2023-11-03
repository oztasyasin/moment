import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container/Container'
import { globalStyles } from '../styles/globalStyles'
import Row from '../components/row/Row';
import { Image, Animated, ScrollView } from 'react-native';
import { fullWidth, navBarHeight, statusBarHeight, themeGrey } from '../data/staticDatas';
import ProfilePlaces from '../components/ProfilePlaces';
import Label from '../components/label/Label';
import PostItem from '../components/PostITem';
import PostModal from '../components/modals/PostModal';
import { useIsFocused } from '@react-navigation/native';
import { getAuthActions, getAuthSlice, getAuthState } from '../store/_redux/auth/service';
import { useDispatch, useSelector } from 'react-redux';
import { getCommonSlice, getCommonState } from '../store/_redux/common/service';
import EditButton from '../components/EditButton';
import { FontAwesome } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import { downloadFile, formatPp, imagePicker } from '../helper/pickers';
import { CameraView } from '../components/CameraView';
import PpModal from '../components/modals/PpModal';
import LogoutButton from '../components/LogoutButton';
import { persistor } from '../store/Store';
import { getCameraPermission } from '../helper/permissions';
import PermissionModal from '../components/modals/PermissionModal';
import { shareAsync } from 'expo-sharing';
import uuid from 'react-native-uuid';
import { getPp, ppHelper } from '../helper/ppHelper';
import { useToast } from 'react-native-toast-notifications';
import { renderToast } from '../helper/toasterHelper';
import * as postActions from '../store/_redux/post/action';
import DeleteModal from '../components/modals/DeleteModal';
import { Get } from '../firebase/firebase';
import axios from 'axios';
import { isEmpty } from '../helper/isEmpty';
import ProfileHeader from '../components/ProfileHeader';
const Profile = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const toast = useToast();
    const selectedUser = route?.params?.user;
    const actionSheet = useRef(null);
    const optionArray = ["Use Camera", "From Galery", "Cancel"];
    const [post, setPost] = useState(null);
    const [image, setImage] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [share, setShare] = useState(null);
    const [hide, setHide] = useState(false);
    const camera = useSelector((state) => state.common.camera);
    const address = getAuthState().address;
    const addressArr = address?.split(', ');
    const city = address ? addressArr[addressArr?.length - 2] : 'Unknown'
    const [permission, setPermission] = useState(null);
    const top = useState(new Animated.Value(0))[0];
    const [y, setY] = useState(null)
    const [deletedItem, setDeletedItem] = useState(null)
    const [friends, setFriends] = useState(null);
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
    const user = getAuthState().user;
    const dispatch = useDispatch();
    const getDetails = (item) => {
        setPost(() => {
            return item
        })
    }
    const openDeleteModal = () => {
        const data = { ...post }
        setPost(() => {
            return null
        })
        setDeletedItem(() => {
            return post
        })
    }
    const deletePost = () => {
        startLoader()
        dispatch(postActions.DeletePost({ id: deletedItem.id }))
            .then((res) => {
                setPost(() => { return null })
                if (res) {
                    getData()
                    toast.show("Post deleted successfuly")
                }
                else {
                    stopLoader();
                    toast.show("Something went wrong")

                }
                setDeletedItem(() => {
                    return null
                })
            })
    }

    const getData = () => {
        startLoader()
        dispatch(postActions.GetByUserId(user?.id))
            .then((res) => {
                if (res) {
                    setPosts(() => {
                        return res;
                    })
                    dispatch(getAuthActions().getFriends())
                        .then((response) => {
                            if (response) {
                                setFriends(() => {
                                    return response;
                                })
                            }
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
        const data = {
            ...share
        }
        setShare(() => { return null })
        startLoader();
        const formattedImage = await formatPp(data.uri);
        try {
            const formData = new FormData();
            formData.append("file", {
                uri: formattedImage.uri,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
            formData.append("userId", user?.id);
            dispatch(getAuthActions()
                .uploadProfilePhoto(formData))
                .then((res) => {
                    if (res) {
                        toast.show("Profile photo added successfuly")
                    }
                    else {
                        toast.show("Something went wrong")
                    }
                    setTrigger((current) => {
                        return !current
                    })
                    stopLoader();
                })

        } catch (error) {
            stopLoader();
        }

    }
    const logout = () => {
        dispatch(getAuthSlice().logout())
        navigation.navigate('/login')
    }

    const shareImage = () => {
        const data = { ...post };
        setPost(() => { return null })
        startLoader();
        downloadFile(ppHelper(data.photoUrl), uuid.v4())
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
        if (isFocused) {
            stopLoader();
            Get()
                .then((res) => {
                    if (res) {
                        dispatch(getCommonSlice().setUrl(res))
                    }
                })
            setPost(() => { return null })
            getData();
            const toValue = 0;
            setHide(() => { return false })
            Animated.timing(top, {
                toValue,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
            });
        }
    }, [isFocused])

    return (
        <Container ignorebottom noscroll>
            <Animated.View style={{ width: fullWidth, marginTop: top, minHeight: 296, backgroundColor: 'black' }}>
                {
                    !hide ?
                        < ProfileHeader
                            trigger={trigger}
                            user={user}
                            posts={posts}
                            city={city}
                            friends={friends}
                            logout={() => logout()}
                            edit={() => edit()}
                        /> : null
                }

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
                                    url={ppHelper(item.photoUrl)} />
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
            {
                deletedItem ?
                    < DeleteModal
                        close={() => setDeletedItem(() => { return null })}
                        delete={() => deletePost()}
                        visible={deletedItem != null}
                    /> : null
            }
            {
                post ?
                    <PostModal
                        close={() => setPost(() => { return null })}
                        post={post}
                        share={() => shareImage()}
                        delete={() => openDeleteModal()}
                        visible={post != null} /> : null
            }

            <PermissionModal
                close={() => setPermission(() => { return null })}
                visible={permission != null}
            />
        </Container>
    )
}

export default Profile