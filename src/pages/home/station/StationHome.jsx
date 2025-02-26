import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIncome, getOrders } from '../../../../store/Actions/stationAction'

export default function StationHome({
    navigation
}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getOrders())
        dispatch(getIncome())
    }, [dispatch])
    const order = useSelector((state) => state.main.order);
    const income = useSelector((state) => state.main.income);
    return (
        <View className=' flex-1 bg-white'>
            <Text className="text-blue-500 text-2xl py-3 text-start w-[88%] font-heading px-2">
                Dashboard
            </Text>

            <View >
                <View className='h-[100px] flex-row justify-evenly items-center w-full px-4 '>
                    <View className=' h-[100px] w-[100px] bg-blue-500  justify-center items-center'>
                        <Text className=' text-white text-2xl font-heading'>
                            {order.filter((item, index) => item.status === 'Placed').length}
                        </Text>
                        <Text className=' text-sm text-white font-heading'>
                            New Orders
                        </Text>
                    </View>
                    <View className=' h-[100px] w-[100px] bg-blue-500  justify-center items-center'>
                        <Text className=' text-white text-2xl font-heading'>
                            {order.filter((item, index) => item.status === 'Completed').length}
                        </Text>
                        <Text className=' text-sm text-center text-white font-heading'>
                            Completed Orders
                        </Text>
                    </View>
                    <View className=' h-[100px] w-[100px] bg-blue-500  justify-center items-center'>
                        <Text className=' text-white text-2xl font-heading'>
                            {income}
                        </Text>
                        <Text className=' text-sm text-center text-white font-heading'>
                            Income
                        </Text>
                    </View>

                </View>
            </View>

            <Text className="text-blue-500 text-2xl py-3 text-start w-[88%] font-heading px-2">
                Recent Orders
            </Text>
            <FlatList
                data={order.filter((item, index) => item.status === 'Placed')}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Complete', { item: item })
                        }}
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
                keyExtractor={item => item._id}
            />
        </View>
    )
}