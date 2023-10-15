import React, { memo } from 'react'
import Label from './label/Label'
import { themeRed } from '../data/staticDatas'

const ErrorLines = (props) => {
    return (
        <>
            {
                props.text ?
                    <Label
                        style={{
                            width:'100%',
                            paddingLeft:6,
                            opacity:0.7
                        }}
                        mt={4}
                        font={[500,14,15]}
                        color={themeRed}
                        text={props.text} /> : null
            }
        </>
    )
}

export default memo(ErrorLines)