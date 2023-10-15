import React, { memo } from 'react'
import { Text } from 'react-native'

const Label = (props) => {
    const { font } = props;
    return (
        <Text style={{
            maxWidth: 500,
            fontWeight: font[0].toString(),
            fontSize: font[1],
            lineHeight: font[2],
            color: props.color,
            marginTop: props.mt,
            marginBottom: props.mb,
            ...props.style
        }}>
            {
                props.subText ?
                    <Text
                        style={{
                            maxWidth: 500,
                            fontWeight: (font[0] - 100).toString(),
                            fontSize: font[1] - 2,
                            lineHeight: font[2] - 2,
                            color: props.subColor,
                        }}>

                    </Text> : null
            }
            {props.text}
        </Text >
    )
}

export default memo(Label)