import React from 'react'
import { View, Text , StyleSheet } from 'react-native'
import FilledButton from "_components/FilledButton";
import AuthContext from '../contexts/AuthContext'

function HomeScreen() {

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

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center",
        padding:30
    },

})