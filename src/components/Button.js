import React, { memo } from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import Label from './label/Label'
import { globalStyles } from '../styles/globalStyles'
import { themeGrey } from '../data/staticDatas'

const Button = (props) => {

    return (
        <TouchableOpacity style={{
            ...globalStyles.buttonFrame,
            backgroundColor: props.color ? props.color : 'black',
            marginTop: props.mt,
            marginBottom: props.mb,
            ...props.style
        }}
            disabled={props.disabled}
            onPress={() => props.press()}>
            {
                !props.withLoading ?
                    <Label
                        text={props.text}
                        font={[700, 16, 24]}
                        color={'white'} /> :
                    <>
                        {
                            props.isLoading ?
                                <ActivityIndicator color={'white'} /> :
                                <Label
                                    text={props.text}
                                    font={[700, 16, 24]}
                                    color={'white'} />

                        }
                    </>
            }

        </TouchableOpacity>
    )
}

export default memo(Button)