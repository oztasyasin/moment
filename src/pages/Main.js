import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Home from './Home';
import Map from './Map';
import { Ionicons } from '@expo/vector-icons'
import { navBarHeight, themeGrey } from '../data/staticDatas';
import { useSelector } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const MainPage = () => {
    const camera = useSelector((state) => state.common.camera);
    return (
        <>

            <Tab.Navigator
                initialRouteName='/home'
                screenOptions={({ route }) => ({
                    tabBarLabel: () => null,
                    tabBarStyle: {
                        display: camera ? 'none' : 'flex',
                        height: navBarHeight,
                        margin: 0,
                        backgroundColor: 'black'
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === '/home') {
                            return (
                                <Ionicons name="home" style={{ color: focused ? "white" : themeGrey }} size={24}></Ionicons>
                            );
                        }
                        else if (route.name === '/map') {
                            return (
                                <Ionicons name="map" style={{ color: focused ? "white" : themeGrey }} size={30} color={focused ? "#1e90ff" : "gray"}></Ionicons>
                            );
                        }
                        else if (route.name === '/profile') {
                            return (
                                <Ionicons name="person-circle" style={{ color: focused ? "white" : themeGrey }} size={30} color={focused ? "#1e90ff" : "gray"}></Ionicons>
                            );
                        }
                    },
                    headerShown: false,
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: '#1e90ff',
                })}>
                <Tab.Screen name="/home" component={Home} />
                <Tab.Screen name="/map" component={Map} />
                <Tab.Screen name="/profile" component={Profile} />
            </Tab.Navigator>
        </>
    )
}

export default MainPage