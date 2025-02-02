import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Auth from './Auth'
import Home from './Home'
import { useDispatch, useSelector } from 'react-redux';
import { Init } from '../../store/Actions/AuthAction';

export default function Index() {
    const access = useSelector((state) => state.main.access);
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(Init())
    }, [dispatch])

    return (
        <>
            {
                access != null ? <Home /> : <Auth />
            }
        </>
    )
}