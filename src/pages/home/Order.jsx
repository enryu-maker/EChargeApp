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
    console.log(booking)

    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        dispatch(getBooking(setLoading))
    }, [])
    return (
        <SafeAreaView className=' flex-1 mt-5 bg-white'>
            <StatusBar backgroundColor={"#fff"} />
            <TouchableOpacity
                onPress={() => navigation.goBack()}

                className=" p-2 h-10 w-10 rounded-full"
            >
                <Image source={Images.left} className=' text-blue-500 h-8 w-8' />
            </TouchableOpacity>
            <View className='flex-1 h-full w-full  justify-start items-start px-4'>
                <Text className="text-blue-500 text-2xl py-3 text-start w-[88%] font-heading">
                    Bookings
                </Text>
                <FlatList
                    data={booking}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            className='bg-gray-100 rounded-md w-[350px]  items-start px-5 py-2'>
                            <Text className="text-blue-500 text-sm font-body">
                                {item.order_id}
                            </Text>
                            <Text className="text-black text-base font-body">
                                ₹ {item.amount}
                            </Text>
                            <Text className="text-black text-base font-body">
                                {item?.station?.name} | {item?.station?.location}
                            </Text>
                            <Text className="text-black text-base font-body">
                                Status: {item.status === 'Placed' ? <Text className='text-red-500'>Placed</Text> : <Text className='text-green-500'>Completed</Text>}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{
                        width: "100%"
                    }}
                    keyExtractor={item => item._id}
                />
            </View>

        </SafeAreaView>
    )
}