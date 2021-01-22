import { Alert } from 'react-native';


import Strings from '../themes/Strings'

// Validating inputs

export const isValidEmail = (val) => {
    return !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val));
}

export function validatePassword(val) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(val);
};

export const isValidContactNumber = (val) => {
    //var re=/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    var re = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    // return /^[0]?[6789]\d{9}$/.test(val);
    return !(re.test(val));
}

export const isValidPassword = (val) => {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return !(re.test(val));
}


export const isEqual = (val1, val2) => {
    if (val1 != val2) {
        return false
    } else {
        return true
    }
}

export const isStrEmpty = (str) => {
    return str === ""
}

//Alerts 

export function showAlertWithSingleAction(alertMessage, btnOnPress, btnText) {
    let text = btnText ?? Strings.Ok
    Alert.alert(
        Strings.AppName,
        alertMessage ?? "",
        [
            { text: text, onPress: () => btnOnPress() },
        ],
        { cancelable: false }
    )
}

export function showAlertWithDoubleAction(alertMessage, positiveBtnText, negativeBtnText, positiveBtnOnPress, negativeBtnOnPress) {
    let btnPositiveText = positiveBtnText ?? Strings.Ok
    let btnNegativeText = negativeBtnText ?? Strings.Ok
    Alert.alert(
        Strings.AppName,
        alertMessage,
        [
          { text: btnNegativeText, onPress: () => negativeBtnOnPress() },
          { text: btnPositiveText, onPress: () => positiveBtnOnPress() },
        ],
        { cancelable: false }
    )
}