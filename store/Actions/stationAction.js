import axios from "axios";
import Toast from "react-native-toast-message";
import axiosIns, { baseURL } from "../../src/helper/Helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StationRegister = (data, setLoading, navigation) => {
    return async dispatch => {
        const formdata = new FormData();
        formdata.append('name', data?.name);
        formdata.append('description', data?.description);
        formdata.append('passcode', data?.passcode);
        formdata.append('price', data?.price);
        formdata.append('phone_number', data?.phone_number);
        formdata.append('latitude', data?.latitude);
        formdata.append('longitude', data?.longitude);
        formdata.append('address', data?.address);
        formdata.append('city', data?.city);
        formdata.append('state', data?.state);
        formdata.append('country', data?.country);
        formdata.append('postal_code', data?.postal_code);
        setLoading(true);
        try {
            let response = await axios.post(baseURL + '/v1/admin/station-register/',
                formdata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
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
                navigation.navigate('SLogin');
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error)
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


export const StationLogin = (data, setLoading, navigation) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axios.post(baseURL + '/v1/station/station-login/',
                data,
            );
            console.log(response)
            Toast.show({
                type: 'success',
                text1: response?.data?.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
            AsyncStorage.setItem('access', response?.data?.access_token);
            AsyncStorage.setItem('vendor', JSON.stringify(true));

            dispatch({
                type: 'SET_ACCESS',
                payload: response?.data?.access_token,
            });
            dispatch({
                type: 'SET_VENDOR',
                payload: true,
            });
        } catch (error) {
            console.log(error)
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



export const getOrders = () => {
    return async (dispatch) => {
        try {
            await axiosIns.get(baseURL + '/v1/order/station-orders/')
                .then((res) => {
                    dispatch({
                        type: "SET_ORDER",
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                    Toast.show({
                        type: 'error',
                        text1: err?.response?.data?.message,
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 50,
                        bottomOffset: 40,
                    });
                });
        }
        catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message || "An error occurred during login.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
        }
    }
}

export const getStationProfile = () => {
    return async (dispatch) => {
        try {
            await axiosIns.get(baseURL + '/v1/station/get-station/')
                .then((res) => {
                    dispatch({
                        type: "SET_SPROFILE",
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                    Toast.show({
                        type: 'error',
                        text1: err?.response?.data?.message,
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 50,
                        bottomOffset: 40,
                    });
                });
        }
        catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message || "An error occurred during login.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
        }
    }
}


export const getIncome = () => {
    return async (dispatch) => {
        try {
            await axiosIns.get(baseURL + '/v1/order/station-total-income/')
                .then((res) => {
                    dispatch({
                        type: "SET_INCOME",
                        payload: res?.data?.total_income
                    })
                })
                .catch((err) => {
                    console.log(err);
                    Toast.show({
                        type: 'error',
                        text1: err?.response?.data?.message,
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 50,
                        bottomOffset: 40,
                    });
                });
        }
        catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.message || "An error occurred during login.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
        }
    }
}

export const updateOrder = (data, setLoading, navigation) => {
    return async (dispatch) => {
        try {
            await axiosIns.get(`/v1/station/order-update/?order_id=${data}`)
                .then((res) => {
                    Toast.show({
                        type: 'success',
                        text1: "Fuel Filled Successfully",
                        visibilityTime: 2000,
                        autoHide: true,
                        topOffset: 50,
                        bottomOffset: 40,
                    });
                    getOrders()
                    navigation.goBack()
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
}
