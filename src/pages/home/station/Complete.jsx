import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Images } from '../../../assets/images'
import { updateOrder } from '../../../../store/Actions/stationAction'

export default function Complete({
    navigation,
    route
}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    console.log(route.params?.item)
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
                    Order Details
                </Text>
                <View className='w-full bg-gray-100 p-4  self-center rounded-xl'>
                    <Text className=' text-black text-base font-body'>
                        Order ID : {route.params?.item.order_id}
                    </Text>
                    <Text className=' text-black text-base font-body'>
                        Amount : ₹ {route.params?.item.amount}
                    </Text>
                    <Text className=' text-black text-base font-body'>
                        Customer : {route.params?.item?.user_name}
                    </Text>
                    <Text className=' text-black text-base font-body'>
                        Status : {route.params?.item.status === 'Placed' ? <Text className='text-red-500'>Placed</Text> : <Text className='text-green-500'>Completed</Text>}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(updateOrder(route.params?.item?.order_id, setLoading, navigation))
                        }}
                        className=' bg-blue-500 px-3 mt-3 py-2 rounded-lg flex justify-center items-center'>
                        {
                            loading ? <Text className=' text-white text-lg font-body'>Loading...</Text> :
                                <Text className=' text-white text-lg font-body'>
                                    Complete Order
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}