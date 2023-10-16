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
import { getAuthSlice, getAuthState } from '../store/_redux/auth/service'
import { getCameraPermission } from '../helper/permissions'
import * as postActions from '../store/_redux/post/action';
import { useIsFocused } from '@react-navigation/native'
import { getPureUrl, ppHelper } from '../helper/ppHelper'
import { downloadFile } from '../helper/pickers';
import { shareAsync } from 'expo-sharing';
import DeleteModal from '../components/modals/DeleteModal'
import { useToast } from 'react-native-toast-notifications';

const Map = () => {
    const statusBarHeight = Constants.statusBarHeight;
    const isFocused = useIsFocused();
    const toast = useToast();
    // const location = useSelector((state) => state.auth.location);
    const [address, setAddress] = useState(null)
    const currentlLocation = useSelector((state) => state.auth.location);
    const [location, setLocation] = useState(currentlLocation);
    const actionSheet = useRef(null);
    const optionArray = ["Use Camera", "From Galery", "Cancel"];
    const [posts, setPosts] = useState(null);
    const [post, setPost] = useState(null);
    const [image, setImage] = useState(null);
    const [share, setShare] = useState(null);
    const isLoading = useSelector((state) => state.common.loading);
    const camera = useSelector((state) => state.common.camera);
    const user = getAuthState().user;
    const [deletedItem, setDeletedItem] = useState(null);
    const startLoader = () => {
        dispatch(getCommonSlice().setLoading(true));
    }
    const stopLoader = () => {
        dispatch(getCommonSlice().setLoading(false));
    }
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
                const manipResult = await ImageManipulator.manipulateAsync(result.assets[0].uri, actions, { compress: 1 });
                postSelectedImage(result.assets[0])
            }
        } catch (error) {
            toast.show(error)
        }
    };
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });
            if (!result.canceled) {
                postSelectedImage(result?.assets[0])
            }
        } catch (error) {
            toast.show(error)
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
    const openDeleteModal = () => {
        const data = { ...post }
        setDeletedItem(() => {
            return data
        })
        setPost(() => {
            return null
        })

    }
    const deletePost = () => {
        startLoader();
        dispatch(postActions.DeletePost({ id: deletedItem.id }))
            .then((res) => {
                if (res) {
                    getData();
                    toast.show("Post deleted successfuly")
                }
                else {
                    toast.show("Something went wrong")

                }
                setDeletedItem(() => { return null })
            })
    }
    const sharePost = async () => {
        startLoader();
        const data = {
            ...share,
            address: address,
            fileName: `${user?.uid}/posts/${share.id}`
        }
        setShare(() => { return null })
        try {
            const address = await addressHelper(share.latitude, share.longitude);

            const formData = new FormData();
            formData.append("file", {
                uri: data.url,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
            formData.append("userId", user?.id);
            formData.append("userName", user?.userName);
            formData.append("profilePhotoUrl", getPureUrl(user?.profilePhoto));
            formData.append("date", data.date);
            formData.append("latitude", data.latitude);
            formData.append("longitude", data.longitude);
            formData.append("address", address);
            dispatch(postActions.AddPost(formData))
                .then((res) => {
                    if (res) {
                        getData();
                        toast.show("Post uploaded successfuly")
                    }
                    else {
                        toast.show("Something went wrong");
                    }
                })
        } catch (error) {
            toast.show(error);
            stopLoader();
        }

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
    const getData = () => {
        startLoader();
        dispatch(postActions.GetAll())
            .then((res) => {
                if (res) {
                    setPosts(() => {
                        return res
                    })
                }
                if(location){
                    stopLoader();
                }
            })
    }

    useEffect(() => {
        if (isFocused) {
            setDeletedItem(() => { return null })
            getData();
        }
    }, [isFocused])

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
                delete={() => openDeleteModal()}
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
                useNativeDriver={true}
                ref={actionSheet}
                title={'Select Image Source'}
                options={optionArray}
                cancelButtonIndex={2}
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
            {
                deletedItem ?
                    < DeleteModal
                        close={() => setDeletedItem(() => { return null })}
                        delete={() => deletePost()}
                        visible={deletedItem != null}
                    /> : null
            }

        </Container>
    )
}

export default Map