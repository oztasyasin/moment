import React, { useState, useRef, useEffect, lazy } from 'react'
import Container from '../components/container/Container'
import { Platform, Text, View } from 'react-native'
import Mapper from '../components/map/Mapper'
import { fakePosts, fullHeight, navBarHeight, useableScreenSize } from '../data/staticDatas'
import PostModal from '../components/modals/PostModal'
import { addressHelper } from '../helper/addresHelper'
import Header from '../components/Header'
import Constants from 'expo-constants';
import CameraView from '../components/CameraView'
import CameraButton from '../components/CameraButton'
import { useDispatch, useSelector } from 'react-redux'
import { getCommonSlice } from '../store/_redux/common/service'
import uuid from 'react-native-uuid';
import { getFormattedDate } from '../helper/getFormattedDate'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import ActionSheet from 'react-native-actionsheet';
import ApprovePost from '../components/modals/ApprovePost'
import { Add, Delete, Get, Upload, deleteFile } from '../firebase/firebase'
import { convertToBase64 } from '../helper/imageParser'
import { getAuthSlice, getAuthState } from '../store/_redux/auth/service'
import { getCameraPermission } from '../helper/permissions'
import axios from 'axios';
const Map = () => {
    const statusBarHeight = Constants.statusBarHeight;
    // const location = useSelector((state) => state.auth.location);
    const [address, setAddress] = useState(null)
    const currentlLocation = useSelector((state) => state.auth.location);
    const [location, setLocation] = useState(currentlLocation);
    const actionSheet = useRef(null);
    const optionArray = ["Use Camera", "From Galery", "From Documents", "Cancel"];
    const [posts, setPosts] = useState(null);
    const [post, setPost] = useState(null);
    const [image, setImage] = useState(null);
    const [share, setShare] = useState(null);
    const isLoading = useSelector((state) => state.common.loading);
    const camera = useSelector((state) => state.common.camera);
    const user = getAuthState().user;
    const dispatch = useDispatch();
    const getDetails = (item) => {
        addressHelper(location.latitude, location.longitude)
            .then((res) => {
                setPost(() => {
                    return { ...item, address: res }
                })
            })
    }
    const changeLocation = (location) => {
        setLocation(() => { return location });
        addressHelper(location.latitude, location.longitude)
            .then((address) => {
                if (address) {
                    dispatch(getAuthSlice().setAddress(address));
                }
                dispatch(getAuthSlice().setLocation(location));
            })
    }
    const openActionSheet = () => {
        actionSheet.current.show()
    }
    const openCamera = () => {
        setImage(() => { return null })
        getCameraPermission()
            .then((res) => {
                if (res === "granted") {
                    dispatch(getCommonSlice().setCamera(true))
                }
            })
    }
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });
            if (result?.assets?.length != 0) {
                postSelectedImage(result.assets[0])
            }
        } catch (error) {
        }
    };
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false
            });
            if (!result.canceled) {
                postSelectedImage(result?.assets[0])
            }
        } catch (error) {
            return
        }

    };
    const actionSheetPress = (i) => {
        switch (i) {
            case 0: openCamera(); break;
            case 1: pickImage(); break;
            case 2: pickDocument(); break;
            default: break;
        }
    }
    const closeCamera = () => {
        dispatch(getCommonSlice().setCamera(false))
    }
    const postSelectedImage = (file) => {
        if (camera) {
            closeCamera();
        }
        const date = new Date();
        const data =
        {
            "id": uuid.v4(),
            "url": file.uri,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "date": getFormattedDate(date),
            "file": file
        }
        setShare(() => {
            return data;
        })
    }
    const postImage = () => {
        const date = new Date();
        const data =
        {
            "id": uuid.v4(),
            "url": image.uri,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "date": getFormattedDate(date),
            "file": image
        }
        setShare(() => {
            return data;
        })
        dispatch(getCommonSlice().setCamera(false))

    }
    const deletePost = () => {
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
            })
    }
    const sharePost = async () => {
        dispatch(getCommonSlice().setLoading(true));
        try {
            const address = await addressHelper(share.latitude, share.longitude);
            const data = {
                ...share,
                address: address,
                fileName: `${user?.uid}/posts/${share.id}`
            }
            const response = await fetch(data.url);
            if (response.status === 200) {
                const blob = await response.blob();
                Upload({ id: data.id, file: blob })
                    .then((res) => {
                        if (res) {
                            delete data.file
                            Add("post", { ...data, url: res, userId: user?.uid })
                                .then((response) => {
                                    if (response) {
                                        getData();
                                    }
                                    dispatch(getCommonSlice().setLoading(false));
                                })
                        }
                        dispatch(getCommonSlice().setLoading(false));
                    })
            }
            dispatch(getCommonSlice().setLoading(false));
            setShare(() => { return null })
        } catch (error) {
            dispatch(getCommonSlice().setLoading(false));
            setShare(() => { return null })
        }

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
    const getData = () => {
        Get("post").
            then((res) => {
                if (res) {
                    setPosts(() => {
                        return res
                    })
                }
            })
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <Container noscroll ignorebottom>
            <Header />
            <View style={{ maxHeight: useableScreenSize }}>
                <Mapper
                    getDetails={(item) => getDetails(item)}
                    locations={posts}
                    address={address}
                    setAddress={setAddress}
                    findLocation
                    requestPage
                    location={location}
                    changeLocation={(location) => changeLocation(location)}
                />
                {
                    !isLoading ?
                        <CameraButton
                            press={() => openActionSheet()}
                        /> : null
                }
            </View>
            <PostModal
                close={() => setPost(() => { return null })}
                post={post}
                share={() => shareImage()}
                delete={() => deletePost()}
                visible={post != null} />
            {
                camera ?
                    <CameraView
                        postSelectedImage={(uri) => postSelectedImage(uri)}
                        postImage={postImage}
                        image={image}
                        setImage={setImage}
                        closeCamera={() => closeCamera()} /> : null
            }
            <ActionSheet
                ref={actionSheet}
                title={'Select Image Source'}
                options={optionArray}
                cancelButtonIndex={3}
                onPress={(index) => actionSheetPress(index)}
            />
            {
                share != null ?
                    < ApprovePost
                        close={() => setShare(() => { return null })}
                        post={share}
                        sharePost={() => sharePost()}
                        visible={share != null} /> : null
            }

        </Container>
    )
}

export default Map