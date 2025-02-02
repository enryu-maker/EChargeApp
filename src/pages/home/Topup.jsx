import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { Images } from '../../assets/images'
import { useDispatch } from 'react-redux'
import { getUserWallet, topupWallet } from '../../../store/Actions/userActions'

export default function Topup({
    navigation
}) {
    const dispatch = useDispatch()
    const [amount, setAmount] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const handleTopUp = () => {
        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }
        dispatch(topupWallet(amount, setLoading, navigation));
        dispatch(getUserWallet(setLoading))
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
                    Top Up Wallet
                </Text>
                <View className='w-full h-[80%]  p-4 space-y-4 justify-center items-center  self-center rounded-xl'>
                    <Text className="text-black text-xl py-3 text-start font-heading">
                        Add Money
                    </Text>
                    <TextInput
                        className={`bg-white border-none text-lg h-[45px] text-center font-heading px-4 py-2 w-[88%] `}
                        placeholder="1234"
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                        keyboardType="numeric"
                        placeholderTextColor="#8b8b8b"
                    />
                    <TouchableOpacity
                        onPress={handleTopUp}
                        className='bg-primary w-[88%] h-[45px] justify-center items-center'>
                        {
                            loading ? (
                                <ActivityIndicator size="small" color={"#fff"} />
                            ) : (
                                <Text className="text-white text-lg font-heading py-2 text-center">
                                    Top Up
                                </Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}