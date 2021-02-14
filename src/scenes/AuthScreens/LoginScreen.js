import React, { useState, useCallback, memo, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Contexts
import AuthContext from './../../contexts/AuthContext'
import SpinnerModalContext from "../../contexts/SpinnerModalContext";

// Custom Utilities
import * as SessionManager from '../../utils/SessionManager'
import WebConstants from '../../utils/networkController/WebConstants';
import ApiManager from '../../utils/ApiManager'
import * as UtilityFunc from '../../utils/UtilityFunc'
import * as FlashManager from '../../utils/FlashManager'
import { Colors, Typography, Mixins } from '../../styles/'
import Images from '../../assets/images/'
import Strings from '../../themes/Strings';

// Custom Components
import InputWithLeftIcon from "../../components/InputWithLeftIcon";
import FilledButtonWithImg from "../../components/FilledButtonWithImg";
import TextButton from "../../components/TextButton";

import VideoPlayer from '../../components/AVPlayer/'


function LoginScreen({ navigation }) {

    const { logIn } = React.useContext(AuthContext)
    const Spinner = React.useContext(SpinnerModalContext)

    const [txtEmail, setTxtEmail] = useState('')
    const [txtPassword, setTxtPassword] = useState('')
    // const [isRemember, setIsRemember] = useState(false)

    const onChangeEmailText = (txt) => {
        setTxtEmail(txt)
    }

    const onChangePasswordText = (txt) => {
        setTxtPassword(txt)
    }

    // const onRememberMeChange = (checked) =>{
    //     setIsRemember(checked)
    // }

    const onSignUpPress = useCallback(() => {
        navigation.navigate('SignUpScreen')
    }, [])

    const onForgotPasswordPress = useCallback(() => {
        navigation.navigate('ForgotPassword')
    }, [])

    const onLoginPress = () => {
        if (validateAllInputs()) {
            loginApiCall()
        }
    }

    const loginApiCall = () => {
        const body = {
            email: txtEmail,
            password: txtPassword,
            "deviceType": 0,
            "deviceToken": "string",
            "userType": 0
        }
        ApiManager.makePostRequest(true, WebConstants.kLogin, body).then((data) => {

        }).catch((errStatus) => {

        })
    }

    const navigateToAppStackNav = () => {
        Spinner.show()
        setTimeout(() => {
            Spinner.hide()
            logIn()
        }, 2000);
    }


    const validateAllInputs = () => {
        if (UtilityFunc.isStrEmpty(txtEmail)) {
            FlashManager.showErrorMessage("Email required !!", "please enter you email address.")
            return false
        } else if (UtilityFunc.isValidEmail(txtEmail)) {
            FlashManager.showErrorMessage("Invalid email address !!", "please enter correct email address.")
            return false
        } if (UtilityFunc.isStrEmpty(txtPassword)) {
            FlashManager.showErrorMessage("Password required !!", "please enter strong password.")
            return false
        } else if (UtilityFunc.isValidPassword(txtPassword)) {
            FlashManager.showErrorMessage("Weak Password !!", "please enter a strong password.")
            return false
        } else {
            return true
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundImage />
            <View style={styles.container}>
                <VideoPlayer style = {{height:250}} url={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} hideFullScreenControl = {false} rotateToFullScreen={true} />
                <LogoImage/>
            </View>
        </SafeAreaView>
    )
}

const BackgroundImage = React.memo(() => {
    return (
        <Image source={Images.img_loginBg} style={styles.imageBG} resizeMode={"cover"} />
    )
})

const LogoImage = React.memo(() => {
    return (
        <Image source={Images.img_logo_circle} style={styles.imageLogo} resizeMode={"contain"} />
    )
})

const WelcomeText = React.memo(() => {
    return (
        <View style={styles.welcomeTextCont}>
            <Text style={styles.welcomeText}>{Strings.Welcome}</Text>
            <Text style={styles.loginToContinueText}>{Strings.LoginToContinue}</Text>
        </View>
    )
})

const EmailInput = ({ value, onChange }) => {
    return (
        <InputWithLeftIcon inputContStyle={styles.inputContStyle}
            leftIcon={Images.email_icon}
            placeholder={Strings.EmailAddress}
            keyboardType="email-address"
            value={value}
            onChangeText={(txt) => onChange(txt)}
        />
    )
}

const PasswordInput = ({ value, onChange }) => {
    return (
        <InputWithLeftIcon inputContStyle={styles.inputContStyle}
            leftIcon={Images.password_icon}
            placeholder={"Password"}
            secureTextEntry={true}
            value={value}
            onChangeText={(txt) => onChange(txt)}
        />
    )
}

const RememberMe = ({ checked = false, onChange = () => { } }) => {

    onPress = () => {
        onChange(!checked)
    }


    return (
        <View style={styles.rememberMeContainer}>
            <Pressable style={styles.checkBoxCont} onPress={onPress}>
                {(checked) ? <Image source={Images.tickmark_icon} style={styles.checkBoxImg} /> : null}
            </Pressable>
            <Text style={styles.rememberMeText}>{Strings.RememberMe}</Text>
        </View>
    )
}

const LoginButton = memo(({ onPress = () => { } }) => {

    return (
        <FilledButtonWithImg title={Strings.Login} textStyle={styles.loginButtonText} style={styles.loginButton} onPress={onPress} />
    )
})

const ForgotPassword = memo(({ onPress = () => { } }) => {
    return (
        <TextButton title={Strings.ForgotPassword} style={styles.btnForgotPassword} textStyle={styles.forgotPasswordTxt} onPress={onPress} />
    )
})

const SignUpButton = memo(({ onPress = () => { } }) => {

    return (
        <Pressable style={styles.btnSignUp} onPress={onPress}>
            <Text style={styles.dontHaveAccountText}>{Strings.DontHaveAccount}</Text>
            <Text style={styles.signUpText}>{Strings.SignUp}</Text>
        </Pressable>
    )
})

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginButton: {
        marginTop: Mixins.scaleRatio(6),
        height: 50,
        width: "100%"
    },
    loginButtonText: {
        fontFamily: Typography.FONT_FAMILY_MEDIUM,
        fontSize: Typography.FONT_SIZE_17
    },
    imageBG: {
        position: "absolute",
        width: "100%",
        height: Mixins.WINDOW_HEIGHT
    },
    imageLogo: {
        marginTop: 30,
        width: 110,
        height: 110,
    },
    inputContStyle: {
        height: 50,
        marginTop: Mixins.scaleRatio(2)
    },
    rememberMeContainer: {
        width: "100%",
        height: 50,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    checkBoxCont: {
        marginLeft: 8,
        width: 27,
        height: 27,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        marginRight: 15,
        borderRadius: 8
    },
    checkBoxImg: {
        width: 27,
        height: 27,
        resizeMode: 'contain',
    },
    rememberMeText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BLACK,
        fontFamily: Typography.FONT_FAMILY_MEDIUM
    },
    dontHaveAccountText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BLACK,
        fontFamily: Typography.FONT_FAMILY_REGULAR
    },
    signUpText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.BLACK,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        marginLeft: 5
    },
    welcomeTextCont: {
        marginTop: Mixins.scaleRatio(3),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Mixins.scaleRatio(3)
    },
    welcomeText: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: Typography.FONT_FAMILY_BOLD
    },
    loginToContinueText: {
        marginTop: 8,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_REGULAR
    },
    forgotPasswordTxt: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_REGULAR
    },
    btnForgotPassword: {
        marginTop: 35
    },
    btnSignUp: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center"
    }
})