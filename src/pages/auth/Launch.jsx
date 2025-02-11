import { View, Text, Image, StatusBar, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { getLocation } from '../../../store/Actions/userActions'
import { useDispatch } from 'react-redux'

export default function Launch({
    navigation
}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        dispatch(getLocation(setLoading, Platform.OS))
    }, [dispatch])
    return (
        <View className=" bg-white h-full w-full">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View className="h-full w-full justify-center items-center space-y-6">
                {/* Login Image */}
                <Text className="text-blue-500 text-4xl py-2 text-center w-[88%] font-heading">
                    Welcome <Text className="font-body text-black">to Echarge</Text>
                </Text>
                <Image
                    source={Images.login}
                    className="w-full h-[40%] object-contain"
                    resizeMode="contain"
                />
                <Text className="font-body text-black  text-4xl py-2 ">Continue As</Text>
                <View className=' w-full flex-row justify-around items-center'>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className=' justify-center items-center'>
                        <View className=' w-[100px] h-[100px] bg-blue-500 rounded-full justify-center items-center'>
                            <Image
                                source={Images.user}
                                className='w-[50px] h-[50px]'
                                resizeMode='contain'
                                tintColor={'#fff'}
                            />
                        </View>
                        <Text className='text-center  font-heading text-lg'>User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SLogin')}
                        className=' justify-center items-center'>
                        <View className=' w-[100px] h-[100px] bg-blue-500 rounded-full justify-center items-center'>
                            <Image
                                source={Images.power}
                                className='w-[50px] h-[50px]'
                                resizeMode='contain'
                                tintColor={'#fff'}
                            />
                        </View>
                        <Text className='text-center  font-heading text-lg'>Station Owner</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}