import { View, Text, Image, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '../assets/images'; // Ensure proper path or fallback
import Home from '../pages/home/Home';
import Settings from '../pages/home/Settings';
import Vehicle from '../pages/home/Vehicle';

const BottomTab = createBottomTabNavigator();

export default function Tab() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HOME') {
                        iconName = Images.home
                    } else if (route.name === 'Vehicle') {
                        iconName = Images.scooter
                    } else if (route.name === 'SETTINGS') {
                        iconName = Images.filter
                    }

                    return (
                        <View className="justify-center items-center mt-10 self-center w-[90px]">
                            <View
                                className={`rounded-full h-[44px] items-center justify-center w-[44px] ${focused ? 'bg-white' : 'bg-transparent'}`}
                            >
                                <Image
                                    source={iconName}
                                    resizeMode="contain"
                                    className="h-[22px] w-[22px]"
                                    style={{
                                        tintColor: focused ? '#3b82f6' : '#000',
                                    }}
                                    accessible
                                    accessibilityLabel={`${route.name} tab`}
                                />
                            </View>
                        </View>
                    );
                },
                tabBarStyle: {
                    backgroundColor: '#3b82f6',
                    height: Platform.OS === 'ios' ? 100 : 80,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: "100%"
                },
            })}
        >
            <BottomTab.Screen
                name="HOME"
                component={Home}
                options={{ tabBarAccessibilityLabel: 'Home Tab' }}
            />
            <BottomTab.Screen
                name="Vehicle"
                component={Vehicle}
                options={{ tabBarAccessibilityLabel: 'Vehicle Tab' }}
            />
            <BottomTab.Screen
                name="SETTINGS"
                component={Settings}
                options={{ tabBarAccessibilityLabel: 'Settings Tab' }}
            />
        </BottomTab.Navigator>
    );
}
