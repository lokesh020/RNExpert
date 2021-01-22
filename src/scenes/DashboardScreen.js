import React from 'react'
import { View, Text , StyleSheet } from 'react-native'

import FilledButton from "../components/FilledButton";

import AuthContext from '../contexts/AuthContext'


function DashboardScreen() {

    const {logOut} = React.useContext(AuthContext)


    function onBtnLogoutPress() {
        logOut()
    }

    return (
        <View style = {styles.container}>
            <FilledButton title = {"LOGOUT"}  onPress = {()=>{onBtnLogoutPress()}} />  
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center",
        padding:30
    },

})