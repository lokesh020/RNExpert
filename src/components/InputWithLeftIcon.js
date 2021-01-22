import React from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import Images from '../assets/images/'
import {Typography,Colors} from '../styles/'

function InputWithLeftIcon({ inputContStyle, leftIcon,leftIconStyle,style, ...props }) {
    let iconSrc = leftIcon ?? Images.no_icon
    return (
        <View style={[styles.inputContainer, inputContStyle]}>
            <View style={styles.leftIconCont}>
                <Image source={iconSrc} style={[styles.leftIcon,{...leftIconStyle}]} resizeMode={"contain"}/>
            </View>
            <TextInput 
                    {...props} 
                    style={[styles.input, style]} 
                    autoCorrect={false}
                    autoCapitalize = {"none"} 
                    placeholderTextColor = {Colors.BLACK}
                    />
        </View>
    )
}

export default InputWithLeftIcon

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        padding: 5,
        backgroundColor:"white",
        borderRadius : 10
    },
    input: {
        flex: 0.85,
        fontSize : Typography.FONT_SIZE_14,
        color : Colors.BLACK,
        fontFamily : Typography.FONT_FAMILY_REGULAR
    },
    leftIcon: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    leftIconCont: {
        flex:0.15,
        justifyContent: "center",
        alignItems: "center"
    }
})