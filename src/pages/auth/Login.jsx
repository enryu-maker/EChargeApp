import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Images } from '../../assets/images'; // Ensure correct image path
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getOtp } from '../../../store/Actions/AuthAction';

export default function Login({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();

    const handleSendOtp = () => {
        if (phone.trim().length !== 10 || isNaN(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        setLoading(true);
        dispatch(getOtp(phone, setLoading, navigation));
    };

    return (
        <View className=" bg-white h-full w-full">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="h-full w-full justify-evenly items-center space-y-6">
                    {/* Login Image */}
                    <Image
                        source={Images.login}
                        className="w-[88%] h-[40%] object-contain"
                        resizeMode="contain"
                    />

                    {/* Form Section */}
                    <View className="h-[50%] rounded-t-3xl space-y-6 w-full items-center justify-center">
                        {/* Title */}
                        <Text className="text-blue-500 text-4xl py-2 text-center w-[88%] font-heading">
                            Sign in <Text className="font-body text-black">to your Account</Text>
                        </Text>
                        <Text className="text-lg text-black font-body text-center">
                            Login with the following method
                        </Text>

                        {/* Input Fields */}
                        <View className="space-y-8 w-full mx-auto justify-center items-center">
                            {/* Phone Number Input */}
                            <View className="w-full items-center">
                                <Text className="w-[88%] self-center text-start font-heading text-lg">
                                    Phone
                                </Text>
                                <TextInput
                                    className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] ${phone.length > 0 ? 'border-blue-500' : 'border-gray-400'
                                        }`}
                                    placeholder="9876543210"
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#8b8b8b"
                                />
                            </View>

                            {/* Send OTP Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleSendOtp}
                                disabled={loading}
                                className={`justify-center items-center h-[50px] w-[88%] ${loading ? 'bg-gray-400' : 'bg-blue-500'
                                    }`}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text className="text-white text-lg text-center font-semibold font-body">
                                        Send OTP
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Register Now Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('Register')}
                                className="justify-center items-center h-[50px] w-[88%]"
                            >
                                <Text className="text-black text-lg text-center font-body">
                                    Don't have an account?{' '}
                                    <Text className="text-blue-500 font-medium font-heading">
                                        Register Now
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
