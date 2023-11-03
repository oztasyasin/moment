import React, { memo } from 'react'
import { TextInput, View } from 'react-native'
import { inputStyles } from './inputStyles'
import Label from '../label/Label'

const Input = (props) => {
    return (
        <View style={{
            ...inputStyles.frame,
            marginTop: props.mt
        }}>
            {
                props.value ?
                    <Label
                        style={inputStyles.smallText}
                        font={[500, 10, 16]}
                        text={props.placeholder} /> : null
            }

            <TextInput
                secureTextEntry={props.hide}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={(e) => props.change(props.hide ? e : e.toLowerCase())}
                style={inputStyles.input} />
        </View>
    )
}

export default memo(Input)