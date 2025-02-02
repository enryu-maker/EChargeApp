import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../../store/Actions/AuthAction';
import { Images } from '../../assets/images'; // Ensure correct image path

export default function Otp({ navigation, route }) {
    console.log(route)
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    // const dispatch = useDispatch();

    return (
        <View className=" bg-white h-screen w-screen ">
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 h-full w-full justify-center items-center space-y-6">
                    {/* Top Image */}
                    <Image source={Images.login} className="w-auto h-[40%] object-contain" resizeMode="contain" />

                    {/* OTP Form Section */}
                    <View className="h-[50%] rounded-t-3xl space-y-3 w-full items-center justify-center">
                        <Text className="text-blue-500 text-4xl py-2 text-center w-[88%] font-heading">
                            Enter <Text className="font-body text-black">OTP</Text>
                        </Text>
                        <Text className="text-lg text-black font-body text-center">
                            Please enter the OTP sent to your phone number
                        </Text>
                        <View className="space-y-8 w-full mx-auto justify-center items-center">
                            {/* OTP Input */}
                            <View className="w-full items-center">
                                <Text className="w-[88%] self-center text-start font-heading text-lg">OTP</Text>
                                <TextInput
                                    className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] ${otp.length > 0 ? 'border-blue-500' : 'border-gray-400'}`}
                                    placeholder="1234"
                                    value={otp}
                                    maxLength={4}
                                    onChangeText={(text) => setOtp(text)}
                                    keyboardType="numeric"
                                    placeholderTextColor="#8b8b8b"
                                />
                            </View>

                            {/* Verify OTP Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (otp.length === 4) {
                                        dispatch(verifyOtp(otp, route.params.number, setLoading, navigation));
                                    }
                                }}
                                className="bg-blue-500 justify-center items-center h-[50px] w-[88%]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white text-lg text-center font-semibold font-body">
                                        Verify OTP
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
