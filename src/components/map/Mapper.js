import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fullWidth, themeGrey } from '../../data/staticDatas';
import { getAdaptedWidth } from '../../helper/sizeAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { getCommonSlice } from '../../store/_redux/common/service';
import { globalStyles } from '../../styles/globalStyles';
import Post from './Post';
import { getAuthSlice } from '../../store/_redux/auth/service';
import { addressHelper, getCurrentPosition } from '../../helper/addresHelper';
import { getLocationPermission } from '../../helper/permissions';
const Mapper = (props) => {
    const [region, setRegion] = useState(null);
    const isLoading = useSelector((state) => state.common.loading);
    const dispatch = useDispatch();
    const handleMapPress = (event) => {
        if (!props.requestPage) {
            const { coordinate } = event.nativeEvent;
        }
    };
    const getLocationAsync = () => {
        getCurrentPosition()
            .then((location) => {
                if (location) {
                    const { coords } = location;
                    props.changeLocation({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    })
                    setRegion(() => {
                        return {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 10,
                            longitudeDelta: 10
                        }
                    })
                }
                dispatch(getCommonSlice().setLoading(false));
            })
    };
    useEffect(() => {
        dispatch(getCommonSlice().setLoading(true));
        getLocationPermission()
            .then((res) => {
                if (res) {
                    getLocationAsync();
                }
            })
    }, []);
    return (
        <View style={defaults.location}>
            <MapView
                onPress={handleMapPress}
                style={{ flex: 1, width: fullWidth, margin: 'auto' }}
                region={region}
            >
                {
                    props.location && !isLoading ?
                        <Marker
                            coordinate={{
                                latitude: props.location?.latitude,
                                longitude: props.location?.longitude,
                            }}
                            title={props.address}
                        >
                            {
                                props.post ?
                                    <Post item={props.post} /> : null
                            }
                        </Marker> : null
                }

                {
                    props?.locations && !isLoading ?
                        <>
                            {
                                props?.locations?.map((item, i) => {
                                    return (
                                        <Marker
                                            onPress={() => props.getDetails(item)}
                                            key={i}
                                            coordinate={{
                                                latitude: item.latitude,
                                                longitude: item.longitude,
                                            }}
                                        >
                                            <Image style={globalStyles.markerImage} source={{ uri: item.url }} />
                                        </Marker>
                                    )

                                })
                            }
                        </> : null
                }
            </MapView>
        </View >
    )
}

export default Mapper
const defaults = StyleSheet.create({
    warnFrame: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        width: fullWidth,
        maxWidth: fullWidth,
        height: '100%',
        overflow: 'hidden',
        alignItems: 'center',
    },
})