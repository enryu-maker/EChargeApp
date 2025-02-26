import { View, Text, Image, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '../assets/images'; // Ensure proper path or fallback
import Settings from '../pages/home/Settings';
import BookStation from '../pages/home/AddScreen/BookStation';
import StationHome from '../pages/home/station/StationHome';
import StationSetting from '../pages/home/station/StationSetting';

const BottomTab = createBottomTabNavigator();

export default function STab() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = Images.home
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
                name="Home"
                component={StationHome}
                options={{ tabBarAccessibilityLabel: 'Home Tab' }}
            />
            <BottomTab.Screen
                name="SETTINGS"
                component={StationSetting}
                options={{ tabBarAccessibilityLabel: 'Settings Tab' }}
            />
        </BottomTab.Navigator>
    );
}
