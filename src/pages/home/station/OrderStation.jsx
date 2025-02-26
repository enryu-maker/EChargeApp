import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../../store/Actions/stationAction'
import { Images } from '../../../assets/images'

export default function OrderStation({
    navigation
}) {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.main.order)
    console.log(order)

    React.useEffect(() => {
        dispatch(getOrders())
    }, [])
    return (
        <SafeAreaView className=' flex-1 bg-white'>
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
                    data={order}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            className='bg-gray-100 rounded-md items-start p-4 my-4 mx-2'>
                            <Text className="text-blue-500 text-sm font-body">
                                {item.order_id}
                            </Text>
                            <Text className="text-black text-base font-body">
                                {item?.user_name} | ₹ {item.amount}
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