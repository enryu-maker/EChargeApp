import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './Tabs';
import Book from '../pages/home/Book';
import Order from '../pages/home/Order';
import Wallet from '../pages/home/Wallet';
import Topup from '../pages/home/Topup';
import AddVehicle from '../pages/home/AddScreen/AddVehicle';
import BookStation from '../pages/home/AddScreen/BookStation';
import Success from '../pages/home/Success';
import StationHome from '../pages/home/station/StationHome';
const Stack = createNativeStackNavigator();
export default function Home() {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => {
                return {
                    detachPreviousScreen: !navigation.isFocused(),
                    headerShown: false,
                    animation: Platform.OS == 'ios' ? 'default' : 'slide_from_right',
                    onTransitionStart: () => Keyboard.dismiss(),
                };
            }}
            initialRouteName='Tab'
        >
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="Book" component={Book} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Top" component={Topup} />
            <Stack.Screen name="AddVehicle" component={AddVehicle} />
            <Stack.Screen name="BookStation" component={BookStation} />
            <Stack.Screen name="StationHome" component={StationHome} />
            <Stack.Screen name="Success" component={Success} />

        </Stack.Navigator>
    )
}