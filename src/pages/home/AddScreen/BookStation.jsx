import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { bookCNG, getSlot, getVehicle } from '../../../../store/Actions/userActions';

export default function BookStation({ navigation, route }) {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [slot, setSlot] = useState('');
    // const vehicle = useSelector((state) => state.main.vehicle);
    const slotdata = useSelector((state) => state.main.slot);

    const [amount, setAmount] = useState(0);
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
                    {/* Dropdown fro available vehicle  */}
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Vehicle
                        </Text>
                        {/* <Dropdown
                            style={{
                                width: '88%',
                                borderBottomWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 12,
                            }}
                            itemTextStyle={{
                                fontFamily: "Poopins"
                            }}
                            data={vehicle}
                            labelField="vehicle_number"
                            valueField="vehicle_number"
                            placeholder="Select Vehicle"
                            placeholderStyle={{ color: '#8b8b8b' }}
                            value={vehicleNumber}
                            onChange={(item) => setVehicleNumber(item)}
                        /> */}
                    </View>
                    {/* Dropdown for slot */}
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Filling Slot
                        </Text>
                        <Dropdown
                            style={{
                                width: '88%',
                                borderBottomWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 12,
                            }}
                            itemTextStyle={{
                                fontFamily: "Poopins"
                            }}
                            data={slotdata}
                            labelField={"time"}
                            valueField="id"
                            placeholder="Select Slot"
                            placeholderStyle={{ color: '#8b8b8b' }}
                            value={slot}
                            onChange={(item) => setSlot(item)}
                        />
                    </View>
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            CNG Fill Amount
                        </Text>
                        <TextInput
                            className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] `}
                            placeholder="10000"
                            value={amount}
                            onChangeText={setAmount}
                            placeholderTextColor="#8b8b8b"
                        />
                    </View>
                </View>

                {/* Save Button */}

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    const data = {
                        "station_id": route?.params?.id,
                        "booking_slot": slot?.id,
                        "amount": amount,
                        "status": "Placed"
                    }
                    console.log(data)
                    dispatch(bookCNG(data, setLoading))
                }}
                className="bg-primary h-20 justify-center items-center"
            >
                <Text className="text-white text-center text-lg font-heading">Book Slot</Text>
            </TouchableOpacity>
        </>
    );
}
