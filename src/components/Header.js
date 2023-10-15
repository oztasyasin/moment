import React, { forwardRef } from 'react'
import { View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Logo from './svg/Logo';
const Header = forwardRef((props, ref) => {
    return (
        <View ref={ref} style={globalStyles.header}>
            <Logo color={'white'} />
        </View>
    )
});

export default Header