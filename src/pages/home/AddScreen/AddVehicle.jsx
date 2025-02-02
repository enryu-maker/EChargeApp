import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Images } from '../../../assets/images';
import { useDispatch } from 'react-redux';
import { postVehicle } from '../../../../store/Actions/userActions';

export default function AddVehicle({ navigation }) {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [make, setMake] = useState('');
    const [loading, setLoading] = useState(false);

    const [model, setModel] = useState('');
    const dispatch = useDispatch()

    return (
        <>
            <SafeAreaView className="flex-1 bg-white p-4">
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}

                    className=" p-2 h-10 w-10 rounded-full"
                >
                    <Image source={Images.left} className=' text-primary h-8 w-8' />
                </TouchableOpacity>

                {/* Title */}

                <View className="space-y-8 w-full mt-5 mx-auto justify-center items-center">
                    {/* Phone Number Input */}
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Vehicle Number
                        </Text>
                        <TextInput
                            className={`bg-white border-b uppercase text-lg h-[50px] font-heading px-4 py-2 w-[88%] `}
                            placeholder="MH15JV7447"
                            value={vehicleNumber}
                            onChangeText={setVehicleNumber}
                            placeholderTextColor="#8b8b8b"
                        />
                    </View>
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Make (Company Name)
                        </Text>
                        <TextInput
                            className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] `}
                            placeholder="MARUTI"
                            value={make}
                            onChangeText={setMake}
                            placeholderTextColor="#8b8b8b"
                        />
                    </View>
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Model (Car Name)
                        </Text>
                        <TextInput
                            className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] `}
                            placeholder="DZIRE"
                            value={model}
                            onChangeText={setModel}
                            placeholderTextColor="#8b8b8b"
                        />
                    </View>
                </View>

                {/* Save Button */}

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    dispatch(postVehicle({
                        "vehicle_number": vehicleNumber,
                        "vehicle_make": make,
                        "vehicle_model": model,
                    }, setLoading))
                }}
                className="bg-primary h-20 justify-center items-center"
            >
                <Text className="text-white text-center text-lg font-heading">Add Vehicle</Text>
            </TouchableOpacity>
        </>
    );
}
