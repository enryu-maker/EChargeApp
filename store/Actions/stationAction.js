import axios from "axios";
import Toast from "react-native-toast-message";
import { baseURL } from "../../src/helper/Helper";

export const StationRegister = (data, setLoading, navigation) => {
    return async dispatch => {
        const formdata = new FormData();
        formdata.append('name', data?.name);
        formdata.append('description', data?.description);
        formdata.append('passcode', data?.passcode);
        formdata.append('price', data?.price);
        formdata.append('phone_number', '+91' + data?.phone_number);
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
            // setTimeout(() => {
            //     navigation.navigate('StationHome');
            //     setLoading(false);
            // }, 2000);
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