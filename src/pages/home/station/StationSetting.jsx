import { View, Text, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Images } from '../../../assets/images'
import { getStationProfile } from '../../../../store/Actions/stationAction'

export default function StationSettins({
    navigation
}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getStationProfile())
    }, [dispatch])
    const stationprofile = useSelector((state) => state.main.stationprofile);
    return (
        <SafeAreaView className='2 bg-white'>
            <StatusBar backgroundColor={"#fff"} />
            <View className='h-full w-full  justify-start items-start px-4'>
                <Text className="text-blue-500 text-2xl py-3 text-start w-[88%] font-heading">
                    Settings
                </Text>
                <View className='h-[100px] flex-row justify-between items-center w-full px-4 border-y border-gray-200 '>
                    <View className=' h-20 w-20 bg-blue-500 rounded-full justify-center items-center'>
                        <Image tintColor={"#fff"} source={Images.user} className='h-12 w-12' />
                    </View>
                    <View className='w-[70%]'>
                        <Text className=' text-xl font-heading'>
                            {stationprofile?.name}
                        </Text>
                        <Text className=' text-base font-heading'>
                            {stationprofile?.phone_number}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('OrderStation')
                    }}
                    className=' flex-row w-[92%] py-1 mt-5 justify-between self-center'>
                    <Text className="text-black text-xl  text-start  font-body">
                        Orders
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        AsyncStorage.clear()
                        dispatch({ type: 'LOGOUT' })
                    }}
                    className=' flex-row w-[92%] justify-between self-center'>
                    <Text className="text-red-500 text-xl py-1 text-start  font-heading">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}