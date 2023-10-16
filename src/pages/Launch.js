import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container/Container';
import { AppState } from 'react-native'
import Row from '../components/row/Row';
import LocationBoy from '../components/svg/LocationBoy';
import { getAdaptedWidth } from '../helper/sizeAdapter';
import Label from '../components/label/Label';
import { themeGrey } from '../data/staticDatas';
import { useNavigation } from '@react-navigation/native';
import { getAuthSlice, getAuthState } from '../store/_redux/auth/service';
import { useDispatch } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
import { getLocationPermission } from '../helper/permissions';
import PermissionModal from '../components/modals/PermissionModal';
import { Get } from '../firebase/firebase';
const Launch = () => {
    const nativation = useNavigation();
    const authState = getAuthState();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current)
    const subscription = AppState.addEventListener('change', nextAppState => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    });
    useEffect(() => {
        const id = setTimeout(() => {
            if (appStateVisible == 'active') {
                Get().then((res) => {
                    dispatch(getCommonSlice()
                        .setUrl(res))
                    dispatch(getCommonSlice().setCamera(false))
                    dispatch(getCommonSlice().setLoading(false))
                    getLocationPermission()
                        .then((res) => {
                            if (res == 'granted') {
                                if (authState.user) {
                                    nativation.navigate('/main')
                                }
                                else {
                                    nativation.navigate('/login')
                                }
                                if (open) {
                                    setOpen(() => {
                                        return false
                                    })
                                }

                                subscription.remove();
                                clearTimeout(id)
                            }
                            else {
                                if (!open) {
                                    setOpen(() => {
                                        return true
                                    })
                                }
                            }
                        })
                })

            }
        }, 5000);
    }, [appStateVisible])

    return (
        <Container noscroll>
            <LocationBoy style={{
                width: getAdaptedWidth(300),
                height: getAdaptedWidth(300),
                marginTop: 100
            }} />
            <Label
                font={[400, 14, 16]}
                color={themeGrey}
                text={"Capture the World, One Point at a Time"} />

            <PermissionModal
                visible={open}
                disableButton
                close={() => { }}
            />
        </Container>
    )
}

export default Launch