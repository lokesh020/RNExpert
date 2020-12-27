import React from 'react'
import { View, Button , StyleSheet } from 'react-native'


function LoginScreen({route}) {
    function onLoginPress(params) {
        
    }
    return (
        <View style = {styles.container}>
            <Button
            onPress={()=>onLoginPress()}
            title="Sign In"
          />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
    },

})