import axios from 'axios';
import axiosIns, { baseURL } from '../../src/helper/Helper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    try {
      let access = await AsyncStorage.getItem('access');
      let vendor = await AsyncStorage.getItem('vendor');

      console.log(access)
      dispatch({
        type: 'SET_ACCESS',
        payload: access,
      });
      dispatch({
        type: 'SET_VENDOR',
        payload: vendor,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ACCESS',
        payload: null,
      });
      dispatch({
        type: 'SET_VENDOR',
        payload: false,
      });
    }
  };
};

export const UserRegister = (name, number, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axios.post(`${baseURL}/v1/user/register/`,
        new URLSearchParams({
          name: name,
          phone_number: number,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log(response.data);
      Toast.show({
        type: 'success',
        text1: response?.data?.message || 'Registered successfully!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });

      setTimeout(() => {
        navigation.navigate('Login', {
          number: number,
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error?.response?.data);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.detail || 'Registration failed!',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });

      setLoading(false);
    }
  };
};

export const getOtp = (number, setLoading, navigation) => {
  console.log(number)
  return async dispatch => {
    setLoading(true);
    try {
      await axios.post(baseURL + '/v1/user/login/', {
        phone_number: number,
      }).then((response) => {
        console.log(response)
        Toast.show({
          type: 'success',
          text1: response?.data?.message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
        setTimeout(() => {
          navigation.navigate('Otp', {
            number: number,
          });
          setLoading(false);
        }, 2000);
      }).catch((error) => {
        console.log(error)
      })

    } catch (error) {
      console.log(error.response.data.message)
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const verifyOtp = (otp, number, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      await axios.post(baseURL + '/v1/user/verify/', {
        phone_number: number,
        otp: otp,
      }).then((response) => {
        Toast.show({
          type: 'success',
          text1: response?.data?.message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
        console.log(response.data)
        AsyncStorage.setItem('access', response?.data?.access_token);
        dispatch({
          type: 'SET_ACCESS',
          payload: response?.data?.access_token,
        });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const updateProfile = (name, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.post(baseURL + '/complete-profile/', {
        name: name,
      });
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Sucessfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      dispatch({
        type: 'PROFILE',
        payload: response?.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getProfile = (setLoading) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + '/v1/user/profile/');
      dispatch({
        type: 'PROFILE',
        payload: response?.data,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const getStation = (location, setLoading, navigation) => {
  return async dispatch => {
    setLoading(true);
    try {
      let response = await axiosIns.get(baseURL + `/v1/user/nearby-station/?user_lat=${19.9975}&user_long=${73.7898}&range_km=10`);
      dispatch({
        type: "STATION",
        payload: response.data
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.msg,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      setLoading(false);
    }
  };
};

export const LogoutAction = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
