import React, {useState} from 'react'
import { View, Text , StyleSheet } from 'react-native'
import {SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from './../../contexts/AuthContext'


import * as SessionManager from '../../utils/SessionManager'
import {Colors} from '_styles'
import Input from "_components/Input";
import FilledButton from "_components/FilledButton";
import TextButton from "_components/TextButton";

function LoginScreen({navigation}) {
    const {logIn} = React.useContext(AuthContext)
    const [txtEmail, setTxtEmail] = useState('')
    const [txtPassword, setTxtPassword] = useState('')

    function onChangeEmailText(txt) {
        setTxtEmail(txt)
    }

    function onChangePasswordText(txt) {
        setTxtPassword(txt)
    }

    function onLoginPress() {
        saveLoginData()
    }

    function saveLoginData() {
        const loginData = {
            email: txtEmail,
            password : txtPassword,
            userToken : "123456"
        }
        SessionManager.setLoginData(JSON.stringify(loginData))
        navigateToAppStackNav()
    }

    function navigateToAppStackNav() {
        logIn()
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style = {styles.container}>
               <Text style={{fontSize:32,color:Colors.BLACK,marginBottom:46}}>LOGIN</Text>
                <Input style = {styles.input} 
                        placeholder = {"Email"} 
                        keyboardType = "email-address" 
                        value = {txtEmail} 
                        onChangeText = {(txt)=>onChangeEmailText(txt)}/>
                <Input style = {styles.input} 
                       placeholder = {"Password"} 
                       value = {txtPassword} 
                       secureTextEntry 
                       onChangeText = {(txt)=>onChangePasswordText(txt)}/>
                <FilledButton title = {"LOGIN"} style={styles.loginButton} onPress = {()=>{onLoginPress()}} />
                <TextButton title = {"Haven't you an account? create one"} 
                            onPress = {()=>{}} />
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1, 
        paddingTop: 100,
        alignItems:"center",
        padding:20
    },
    input : {
        marginVertical:8,
        backgroundColor:"#e8e8e8",
        borderRadius : 8
    },
    loginButton:{
        marginVertical:32
    }

})