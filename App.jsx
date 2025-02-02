// In App.js in a new project

import * as React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Index from './src/navigation/Index';
import { Provider } from 'react-redux';
import { store } from './store';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Auth from './src/navigation/Auth';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helper/toastConfig';
import Login from './src/pages/auth/Login';
export default function App() {
  React.useEffect(() => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.PHOTO_LIBRARY,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          PERMISSIONS.IOS.LOCATION_ALWAYS,
        ]
        : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ],
    ).then(statuses => { });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <Index />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}


