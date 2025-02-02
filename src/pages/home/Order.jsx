import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { getBooking, getSlot } from '../../../store/Actions/userActions'

export default function Order({
    navigation
}) {
    const dispatch = useDispatch()
    const booking = useSelector((state) => state.main.booking)
    const slotdata = useSelector((state) => state.main.slot)

    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        dispatch(getBooking(setLoading))
        dispatch(getSlot(setLoading))
    }, [])
    function getSlotdata(slotdata, id) {
        var data = slotdata.filter((item) => item.id === id)
        return data[0]?.time
    }
    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url).catch((err) => console.error("Failed to open Google Maps:", err));
    };
    return (
        <SafeAreaView className='flex-1'>
            <StatusBar backgroundColor={"#fff"} />
            <TouchableOpacity
                onPress={() => navigation.goBack()}

                className=" p-2 h-10 w-10 rounded-full"
            >
                <Image source={Images.left} className=' text-primary h-8 w-8' />
            </TouchableOpacity>
            <View className='flex-1 h-full w-full  justify-start items-start px-4'>
                <Text className="text-primary text-2xl py-3 text-start w-[88%] font-heading">
                    Bookings
                </Text>
                <FlatList
                    data={booking}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            className='bg-white rounded-md flex-row space-x-5 items-center p-4 my-4 mx-2'>
                            <View>
                                <Text className="text-primary text-sm font-body">
                                    {item.order_id}
                                </Text>
                                <Text className="text-black text-base font-body">
                                    ₹ {item.amount} | {getSlotdata(slotdata, item.booking_slot)}
                                </Text>
                                <Text className="text-black text-base font-body">
                                    {item?.station?.name} | {item?.station?.location}
                                </Text>
                                <Text className="text-black text-base font-body">
                                    Status: {item.status === 'placed' ? <Text className='text-red-500'>Placed</Text> : <Text className='text-green-500'>Completed</Text>}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item._id}
                />
            </View>

        </SafeAreaView>
    )
}