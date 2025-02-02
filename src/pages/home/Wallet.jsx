import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { useSelector } from 'react-redux';

export default function Wallet({
    navigation
}) {
    const wallet = useSelector((state) => state.main.wallet);

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
                    Wallet
                </Text>
                <View className='w-full bg-primary p-4  self-center rounded-xl'>
                    <Text className=' text-white text-xl font-body'>
                        Wallet ID : {wallet?.wallet_number}
                    </Text>
                    <Text className=' text-white text-xl font-body'>
                        Available Balance : {wallet?.balance}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Top')
                        }}
                        className=' bg-white w-[100px] mt-3 rounded-lg flex justify-center items-center'>
                        <Text className=' text-primary text-lg font-body'>
                            + Top-Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}