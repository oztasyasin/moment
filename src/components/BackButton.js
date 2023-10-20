import React from 'react'
import { TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const BackButton = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                ...globalStyles.backButton,
                ...props.style
            }}>
            <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
    )
}

export default BackButton