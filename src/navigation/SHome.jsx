import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import STab from './STab';
import OrderStation from '../pages/home/station/OrderStation';
import Complete from '../pages/home/station/Complete';
const Stack = createNativeStackNavigator();
export default function SHome() {
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
            initialRouteName='STab'
        >
            <Stack.Screen name="STab" component={STab} />
            <Stack.Screen name="OrderStation" component={OrderStation} />
            <Stack.Screen name="Complete" component={Complete} />
        </Stack.Navigator>
    )
}