import { View, Text, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../store/Actions/AuthAction'
import { getUserWallet } from '../../../store/Actions/userActions'

export default function Settings({
    navigation
}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const profile = useSelector((state) => state.main.profile);
    const wallet = useSelector((state) => state.main.wallet);
    React.useEffect(() => {
        dispatch(getProfile(setLoading))
        dispatch(getUserWallet(setLoading))
    }, [dispatch])
    return (
        <SafeAreaView className=' flex-1'>
            <StatusBar backgroundColor={"#fff"} />
            <View className='flex-1 h-full w-full  justify-start items-start px-4'>
                <Text className="text-primary text-2xl py-3 text-start w-[88%] font-heading">
                    Settings
                </Text>
                <View className='h-[100px] flex-row justify-between items-center w-full px-4 border-y border-gray-200 '>
                    <Image source={{ uri: `data:image/png;base64,${profile?.icon}` }} className=' h-20 w-20 bg-primary rounded-full' />
                    <View className='w-[70%]'>
                        <Text className=' text-xl font-heading'>
                            {profile?.name}
                        </Text>
                        <Text className=' text-base font-heading'>
                            {profile?.phone_number}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Wallet')
                    }}
                    className=' flex-row w-[92%] py-1 pt-5 justify-between self-center'>
                    <Text className="text-black text-xl  text-start  font-body">
                        Wallet
                    </Text>
                    <Text className="text-primary text-xl  text-start  font-heading ">
                        ₹ {wallet?.balance}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Order')
                    }}
                    className=' flex-row w-[92%] py-1 justify-between self-center'>
                    <Text className="text-black text-xl  text-start  font-body">
                        Bookings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
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