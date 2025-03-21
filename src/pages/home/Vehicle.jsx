import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicle } from '../../../store/Actions/userActions'
import { Images } from '../../assets/images'

export default function Vehicle({
    navigation
}) {
    const [loading, setLoading] = React.useState(false)
    const vehicle = useSelector((state) => state.main.vehicle);
    console.log(vehicle)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getVehicle(setLoading))
    }, [dispatch])
    return (
        <SafeAreaView className=' bg-white flex-1'>
            <StatusBar backgroundColor={"#fff"} />
            <View className='h-[50px] w-full flex-row  justify-between mt-6  items-center px-4'>
                <Text className="text-blue-500 text-2xl py-3 text-start  font-heading">
                    Vehicle
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AddVehicle")
                    }}
                    className='bg-blue-500 rounded-md'>
                    <Text className="text-white text-base py-1 px-3 text-start font-body">
                        Add +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={vehicle}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("VehicleDetails", { item })
                        }}
                        className='bg-gray-100 rounded-md flex-row space-x-5 items-center p-4 my-4 mx-4'>
                        <Image source={Images.car} tintColor={"#3b82f6"} className='w-12 h-12' />
                        <View>
                            <Text className="text-blue-500 text-lg font-heading">
                                {item.vehicle_number}
                            </Text>
                            <Text className="text-black text-lg font-body">
                                {item.vehicle_make} | {item.vehicle_model}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    )
}