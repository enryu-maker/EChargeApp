import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Linking } from 'react-native';
import { Images } from '../../assets/images';
import { useDispatch } from 'react-redux';
import { getSlot } from '../../../store/Actions/userActions';
export default function ContractorInfo({ navigation, route }) {
    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url).catch((err) => console.error("Failed to open Google Maps:", err));
    };
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getSlot(setLoading))
    }, [])
    return (
        <>

            <SafeAreaView className=" bg-white mt-5  ">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}

                    className=" p-2 h-10 w-10 rounded-full"
                >
                    <Image source={Images.left} className=' text-primary h-10 w-10' />
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {/* Contractor Info Section */}
                    <View className=" p-4  ">
                        <View
                            className=' flex-row justify-between  '>
                            <View className='w-[70%]'>
                                <Text className="font-heading text-2xl font-bold text-primary mb-2">{route?.params?.data?.name} </Text>
                                <Text className="font-body text-gray-700 text-justify mb-2">{route?.params?.data?.description}</Text>
                            </View>
                        </View>

                        <Text className="font-body text-lg text-gray-500 mb-2 pt-4 border-t border-gray-300">
                            Price : {route?.params?.data?.price}
                        </Text>
                        <Text
                            onPress={() => {
                                openGoogleMaps(route?.params?.data?.latitude, route?.params?.data?.longitude);
                            }}
                            className="font-body text-lg text-gray-500 mb-2">Address: {route?.params?.data?.address} 🗺️</Text>
                        <Text className="font-body text-lg text-gray-500 mb-2">City: {route?.params?.data?.city}</Text>
                        <Text className="font-body text-lg text-gray-500 mb-2">Postal Code: {route?.params?.data?.postal_code}</Text>
                        <Text className="font-body text-lg text-gray-500 mb-2 pb-4 border-b border-gray-300">Contact: {route?.params?.data?.phone_number}</Text>
                    </View>

                </ScrollView>

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => navigation.navigate('BookStation', {
                    id: route?.params?.data?.id
                })}
                className="bg-primary h-20 justify-center items-center"
            >
                <Text className="text-white text-center text-lg font-heading">Book Slot</Text>
            </TouchableOpacity>
        </>
    );
}
