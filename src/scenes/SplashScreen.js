import React,{useEffect} from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { StackActions } from '@react-navigation/native';


import Images from '../assets/images/'

function SplashScreen({route,navigation}) {

    function navigateToLogin() {
        navigation.dispatch(
            StackActions.replace('LoginScreen')
        )
    }

    useEffect(() => {
        
        setTimeout(() => {
            navigateToLogin()
        }, 2000);

    }, [])

    return (
        <View style = {styles.container}>
            <Image source = {Images.img_youtube} style = {styles.logo} resizeMode = {"contain"} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        width:150,
        height:150
    }
})