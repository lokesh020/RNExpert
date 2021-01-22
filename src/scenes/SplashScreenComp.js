import React,{useEffect} from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { StackActions } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';


import Images from '../assets/images/'

function SplashScreenComp({route,navigation}) {

    function navigateToRootStack() {
        navigation.dispatch(
            StackActions.replace('RootNavigator')
        )
    }

    useEffect(() => {
        SplashScreen.hide()
        navigateToRootStack()
    }, [])

    return (
        <View style = {styles.container}>
            <Image source = {Images.img_splash} style = {styles.splash} resizeMode = {"contain"} />
        </View>
    )
}

export default SplashScreenComp

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
    },
    splash:{
        flex:1
    }
})