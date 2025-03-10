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
    console.log(route)
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
                    <Image source={Images.left} className=' text-blue-500 h-8 w-8' />
                </TouchableOpacity>

                {/* Title */}

                <View className="space-y-8 w-full mt-5 mx-auto justify-center items-center">
                    {/* Dropdown fro available vehicle  */}
                    {/* Dropdown for slot */}
                    {/* <View className="w-full items-center">
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
                    </View> */}
                    <View className="w-full items-center">
                        <Text className="w-[88%] self-center text-start font-heading text-lg">
                            Battery Fill Percentage
                        </Text>
                        <TextInput
                            className={`bg-white border-b text-lg h-[50px] font-heading px-4 py-2 w-[88%] `}
                            placeholder="100%"
                            value={amount}
                            onChangeText={setAmount}
                            placeholderTextColor="#8b8b8b"
                        />
                    </View>
                    <Text className="w-[88%] self-center text-start font-heading text-lg">
                        Total Amount to pay : ₹ {amount * route?.params?.rate}
                    </Text>
                </View>

                {/* Save Button */}

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    const data = {
                        "station_id": route?.params?.id,
                        "amount": amount * route?.params?.rate,
                        "status": "Placed"
                    }
                    console.log(data)
                    dispatch(bookCNG(data, setLoading))
                }}
                className="bg-blue-500 h-20 justify-center items-center"
            >
                <Text className="text-white text-center text-lg font-heading">Book Slot</Text>
            </TouchableOpacity>
        </>
    );
}
