import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images } from '../../assets/images'; // Make sure you have the appropriate image
import { useDispatch, useSelector } from 'react-redux';
import { UserRegister } from '../../../store/Actions/AuthAction';
import { StationRegister } from '../../../store/Actions/stationAction';
import { getLocation } from '../../../store/Actions/userActions';

export default function SRegister({ navigation }) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [pass, setPass] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useSelector((state) => state.main.location);

    const dispatch = useDispatch();
    return (
        <View className=" h-full w-full bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 h-full w-full justify-center items-center space-y-6">

                    {/* Form Section */}
                    <View className=" rounded-t-3xl space-y-6 w-full h-full items-center justify-evenly">
                        <Text className="text-blue-500 text-4xl py-2 text-center w-[88%] font-heading">
                            Sign up <Text className="font-body text-black"> your Account</Text>
                        </Text>
                        {/* Name Input */}
                        <View className="w-full items-center">
                            <Text className="w-[88%] self-center text-start font-heading text-lg">Name</Text>
                            <TextInput
                                className="bg-white border-b text-lg h-[50px] px-4 py-2 w-[88%] font-heading border-gray-400"
                                placeholder="Enter your full name"
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholderTextColor="#8b8b8b"
                            />
                        </View>
                        <View className="w-full items-center">
                            <Text className="w-[88%] self-center text-start font-heading text-lg">Description</Text>
                            <TextInput
                                className="bg-white border-b text-lg h-[100px] px-4 py-2 w-[88%] font-heading border-gray-400"
                                placeholder="Enter your full name"
                                value={desc}
                                multiline={true}
                                onChangeText={(text) => setDesc(text)}
                                placeholderTextColor="#8b8b8b"
                            />
                        </View>
                        <View className="w-full items-center">
                            <Text className="w-[88%] self-center text-start font-heading text-lg">Passcode</Text>
                            <TextInput
                                className={`bg-white border-b text-lg h-[50px] px-4 py-2 w-[88%] font-heading ${phone.length > 0 ? 'border-blue-500' : 'border-gray-400'
                                    }`}
                                placeholder="1234"
                                maxLength={4}
                                value={pass}
                                onChangeText={(text) => setPass(text)}
                                keyboardType="phone-pad"
                                placeholderTextColor="#8b8b8b"
                            />
                        </View>
                        <View className="w-full items-center">
                            <Text className="w-[88%] self-center text-start font-heading text-lg">Price</Text>
                            <TextInput
                                className={`bg-white border-b text-lg h-[50px] px-4 py-2 w-[88%] font-heading ${phone.length > 0 ? 'border-blue-500' : 'border-gray-400'
                                    }`}
                                placeholder="Price per % of charge"
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                                keyboardType="phone-pad"
                                placeholderTextColor="#8b8b8b"
                            />
                        </View>

                        {/* Phone Input */}
                        <View className="w-full items-center">
                            <Text className="w-[88%] self-center text-start font-heading text-lg">Phone</Text>
                            <TextInput
                                className={`bg-white border-b text-lg h-[50px] px-4 py-2 w-[88%] font-heading ${phone.length > 0 ? 'border-blue-500' : 'border-gray-400'
                                    }`}
                                placeholder="9876543210"
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                keyboardType="phone-pad"
                                placeholderTextColor="#8b8b8b"
                            />
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                dispatch(StationRegister({
                                    name: name,
                                    description: desc,
                                    passcode: pass,
                                    price: price,
                                    phone_number: phone,
                                    latitude: location?.latitude,
                                    longitude: location?.longitude,
                                    address: location?.address,
                                    city: location?.city,
                                    state: location?.state,
                                    country: location?.country,
                                    postal_code: location?.pin_code,

                                }, setLoading, navigation));
                            }}
                            className="bg-blue-500 justify-center items-center h-[50px] w-[88%] rounded-lg"
                        >
                            <Text className="text-white text-lg text-center font-semibold font-body">
                                Register
                            </Text>
                        </TouchableOpacity>

                        {/* Login Now Button */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            className="justify-center items-center h-[50px] w-[88%]"
                        >
                            <Text className="text-black text-lg text-center font-body">
                                Already have an account?{' '}
                                <Text className="text-blue-500 font-medium font-heading">Login Now</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
