import React from 'react'
import { View, Text , StyleSheet } from 'react-native'
import FilledButton from "_components/FilledButton";
import AuthContext from '../contexts/AuthContext'
import RootModalContext from '../contexts/RootModalContext'

function SuccessModalView() {
    const {hideModal} = React.useContext(RootModalContext)
    function onBtnHideModal() {
        hideModal()
    }
    return (
        <View style = {{flex:1,margin:25,justifyContent:"center",alignItems:"center",backgroundColor:'white'}}>
            <Text style = {{fontSize:30,fontWeight: 'bold',marginBottom:20}}>Success</Text>
            <FilledButton title = {"Hide Modal"}  onPress = {()=>{onBtnHideModal()}} />
        </View>
    )
}

function FailureModalView() {
    const {hideModal} = React.useContext(RootModalContext)
    function onBtnHideModal() {
        hideModal()
    }
    return (
        <View style = {{flex:1,margin:25,justifyContent:"center",alignItems:"center",backgroundColor:'white'}}>
            <Text style = {{fontSize:30,fontWeight: 'bold',marginBottom:20}}>Failure</Text>
            <FilledButton title = {"Hide Modal"}  onPress = {()=>{onBtnHideModal()}} />
        </View>
    )
}



function HomeScreen() {

    const {logOut} = React.useContext(AuthContext)
    const {setUpModal, showModal} = React.useContext(RootModalContext)


    function onBtnLogoutPress() {
        logOut()
    }

    function onBtnSuccessModalShow() {
        const config = {
            modalView :  <SuccessModalView/>,
            modalProps : {
                animationType : "none",
                transparent : true
            }
        }
        setUpModal(config)
        showModal()
    }

    function onBtnFailureModalShow() {
        const config = {
            modalView :  <FailureModalView/>,
            modalProps : {
                animationType : "slide",
                transparent : true
            }
        }
        setUpModal(config)
        showModal()
    }

    return (
        <View style = {styles.container}>
            <FilledButton title = {"LOGOUT"}  onPress = {()=>{onBtnLogoutPress()}} />  
            <FilledButton style = {{marginVertical:10}} title = {"Success Modal"}  onPress = {()=>{onBtnSuccessModalShow()}} />
            <FilledButton style = {{marginVertical:10}} title = {"Failure Modal"}  onPress = {()=>{onBtnFailureModalShow()}} />     
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