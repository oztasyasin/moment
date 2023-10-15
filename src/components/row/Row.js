import React, { memo, forwardRef } from 'react'
import { View } from 'react-native'
import { rowStyles } from './rowStyles'
import { fullWidth } from '../../data/staticDatas'

const Row = forwardRef((props, ref) => {
    return (
        <View
            onLayout={props.onLayout}
            ref={ref}
            style={{
                ...rowStyles.row,
                marginTop: props.mt,
                minWidth: props.fullSize ? fullWidth : '100%',
                marginBottom: props.mb,
                backgroundColor: props.color,
                flexWrap: props.wrap ? 'wrap' : 'nowrap',
                flexDirection: props.vertical ? 'column' : 'row',
                justifyContent: props.center ? 'center' : props.end ? 'flex-end' : props.split ? 'space-between' : 'flex-start',
                paddingVertical: props.pv ? props.pv : 0,
                paddingHorizontal: props.ph ? props.ph : 0,
                ...props.style,

            }}>
            {props.children}
        </View>
    )
});

export default memo(Row)