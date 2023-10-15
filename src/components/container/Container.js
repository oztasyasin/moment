import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { containerStyles } from './containerStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import FullsizeLoader from '../fullSizeLoader/FullsizeLoader'
import { fullHeight } from '../../data/staticDatas'
const Container = (props) => {
    const isLoading = useSelector((state) => state.common.loading);
    const getEdges = () => {
        if (props.ignorebottom && !props.ignoretop) {
            return ["top", "left", "right"]
        }
        else if (props.ignorebottom && props.ignoretop) {
            return ["left", "right"]
        }
        else if (!props.ignorebottom && props.ignoretop) {
            return ["left", "right", "bottom"]
        }
        return ["top", "left", "right", "bottom"]
    }
    return (
        <SafeAreaView edges={getEdges()} style={containerStyles.container}>
            {
                !props.noscroll ?
                    <ScrollView style={containerStyles.scroll}>
                        <View style={{ ...containerStyles.view, justifyContent: props.center ? 'center' : 'flex-start', maxHeight: props.customSize ? props.customSize : fullHeight }}>
                            {props.children}
                        </View>
                    </ScrollView> :
                    props.keyboard ?
                        <>
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                                <ScrollView style={{ ...containerStyles.scroll, minHeight: 'auto' }}>
                                    <View style={{ ...containerStyles.view, justifyContent: props.center ? 'center' : 'flex-start' }}>
                                        {props.children}
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>

                        </> :
                        <>
                            <View style={{ ...containerStyles.view, justifyContent: props.center ? 'center' : 'flex-start', maxHeight: props.customSize ? props.customSize : fullHeight }}>
                                {props.children}
                            </View>
                        </>

            }
            {
                isLoading ? <FullsizeLoader /> : null
            }
        </SafeAreaView>
    )
}

export default Container