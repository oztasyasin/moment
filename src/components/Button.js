import React, { memo } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Label from './label/Label'
import { globalStyles } from '../styles/globalStyles'

const Button = (props) => {
    return (
        <TouchableOpacity style={{
            ...globalStyles.buttonFrame,
            backgroundColor: props.color ? props.color : 'black',
            marginTop: props.mt,
            marginBottom: props.mb,
            ...props.style
        }}
            onPress={() => props.press()}>
            <Label
                text={props.text}
                font={[700, 16, 24]}
                color={'white'} />
        </TouchableOpacity>
    )
}

export default memo(Button)