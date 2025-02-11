import GetLocation from "react-native-get-location";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import axiosIns, { baseURL } from "../../src/helper/Helper";
import Toast from "react-native-toast-message";

export const getLocation = (setLoading, type) => {
    console.log(type)
    setLoading(true)
    return async dispatch => {
        if (type === "ios") {
            Geolocation.getCurrentPosition(
                async (position) => {
                    console.log("ios", position)
                    await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`).
                        then((res) => {
                            console.log("data", res.data)
                            const city = res.data.features[0].properties.city;
                            const pin_code = res.data.features[0].properties.postcode;
                            const state = res.data.features[0].properties.state;
                            const country = res.data.features[0].properties.country;
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
                            dispatch({
                                type: 'GET_LOCATION',
                                payload: {
                                    city: city,
                                    state: state,
                                    country: country,
                                    pin_code: pin_code,
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 5,
                                    longitudeDelta: 5
                                },
                            })
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000)
                        }
                        )
                },
                (error) => {
                    console.log(error.code, error.message);
                    setLoading(false)

                },
                { enableHighAccuracy: true, timeout: 60000, },
            );
        }
        else {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            })
                .then(async location => {
                    await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${location?.latitude}&lon=${location?.longitude}&apiKey=328fd33ba9f0413d9b38d214f042e36c`).
                        then((res) => {
                            const address = res.data.features[0].properties.address_line1;
                            const city = res.data.features[0].properties.city;
                            const pin_code = res.data.features[0].properties.postcode;
                            const state = res.data.features[0].properties.state;
                            const country = res.data.features[0].properties.country;
                            const latitude = location.latitude;
                            const longitude = location.longitude;
                            dispatch({
                                type: 'GET_LOCATION',
                                payload: {
                                    city: city,
                                    address: address,
                                    state: state,
                                    country: country,
                                    pin_code: pin_code,
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 5,
                                    longitudeDelta: 5
                                },
                            })
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000)
                        })
                })
                .catch(error => {
                    console.log("error", error);
                    const { code, message } = error;
                    console.log(code, message);
                })
        }

    }
}


export const getUserWallet = (setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axiosIns.get(baseURL + `/v1/user/user-wallet/`);
            dispatch({
                type: 'WALLET',
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

export const topupWallet = (amount, setLoading, navigation) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axiosIns.put(baseURL + `/v1/user/update-wallet/?amount=${amount}`);
            Toast.show({
                type: 'success',
                text1: response?.data?.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
            // dispatch(getUserWallet(setLoading))
            setLoading(false);
            navigation.goBack();
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

export const getVehicle = (setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axiosIns.get(baseURL + `/v1/user/vehicle/`);
            dispatch({
                type: 'VEHICLE',
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

export const postVehicle = (data, setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axiosIns.post(baseURL + `/v1/user/vehicle/`, data);
            Toast.show({
                type: 'success',
                text1: response?.data?.message,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
                bottomOffset: 40,
            });
            getVehicle(setLoading)
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

export const getSlot = (setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            let response = await axiosIns.get(baseURL + `/v1/admin/slots/`);
            dispatch({
                type: 'SLOT',
                payload: response?.data?.slots,
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

export const bookCNG = (data, setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            console.log(data)
            await axiosIns.post(baseURL + `/v1/order/create/`, data).then((res) => {
                console.log(res)
                Toast.show({
                    type: 'success',
                    text1: res?.data?.message,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                });
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: err?.response?.data?.message,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                });
            })
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

export const getBooking = (setLoading) => {
    return async dispatch => {
        setLoading(true);
        try {
            await axiosIns.get(baseURL + `/v1/order/user-orders/`).then((res) => {
                dispatch({ type: 'GET_BOOKING', payload: res?.data })
            }).catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: err?.response?.data?.message,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 50,
                    bottomOffset: 40,
                });
            })
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

