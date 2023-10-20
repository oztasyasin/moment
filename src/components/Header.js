import React, { forwardRef } from 'react'
import { View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Logo from './svg/Logo';
import BackButton from './BackButton';
const Header = forwardRef((props, ref) => {
    return (
        <View ref={ref} style={globalStyles.header}>
            {
                props.hasBackButton ?
                    <BackButton /> : null
            }
            <Logo color={'white'} />
        </View>
    )
});

export default Header