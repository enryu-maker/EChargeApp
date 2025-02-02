import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../../../store/Actions/userActions';
import LottieView from 'lottie-react-native';
import { Animation } from '../../assets/animation';
import { getStation } from '../../../store/Actions/AuthAction';

export default function Home({ navigation }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const location = useSelector((state) => state.main.location);
    const station = useSelector((state) => state.main.station);
    console.log(station)

    useEffect(() => {
        dispatch(getStation(location, setLoading, navigation))
    }, [location, dispatch])

    // Contractor data

    useEffect(() => {
        // dispatch(getLocation(setLoading, Platform.OS));
    }, [dispatch]);

    return (
        <View className="bg-white flex-1 h-full w-full">
            <StatusBar barStyle="dark-content" translucent />
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <LottieView
                        source={Animation.searching}
                        autoPlay
                        loop
                        className="w-40 h-40"
                    />
                </View>
            ) : (
                <MapView
                    className="h-full w-full"
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 19.9975,
                        longitude: 73.7898,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {station.map((contractor, index) => {
                        if (contractor?.is_active && contractor?.fuel_available) {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: parseFloat(contractor.latitude),
                                        longitude: parseFloat(contractor.longitude),
                                    }}
                                    onPress={() => {
                                        navigation.navigate("Book", {
                                            data: contractor
                                        })
                                    }}
                                >
                                    <Text className="text-center text-2xl">⛽</Text>
                                </Marker>
                            )
                        }
                    })}
                </MapView>
            )}
        </View>
    );
}
