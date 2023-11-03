import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { routes } from './routes'
import { CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
const Stack = createStackNavigator();
const RoutesPage = () => {
    const dispatch = useDispatch();
    const startLoader = () => {
        dispatch(getCommonSlice().setLoading(true));
    }
    const stopLoader = () => {
        dispatch(getCommonSlice().setLoading(false));
    }
    return (
        <>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerMode: 'none'
                }}>
                    {
                        routes.map((item, index) => {
                            return (
                                <Stack.Screen
                                    key={index}
                                    name={item.path}
                                    component={item.component}
                                    initialParams={{  startLoader, stopLoader }}
                                />
                            )
                        })
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default RoutesPage