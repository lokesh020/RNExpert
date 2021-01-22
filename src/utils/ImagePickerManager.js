import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../themes/Strings';
import * as FlashManager from './FlashManager'
import {Typography} from '../styles/'

class ImagePickerManager {

    options = {
        mediaType : "photo",
        maxWidth : 300,
        maxHeight : 300
    };

    constructor() {
        
    }

    showCamera = (options = {}) => {
        let promise = new Promise((resolve, reject) => {
            const customOptions = {...this.options,...options}
            console.log(JSON.stringify(customOptions))
            launchCamera(customOptions, (response) => {
                if (response.didCancel) {
                    FlashManager.showErrorMessage(Strings.CanceledAction,"",{icon: null})
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: >>>', response.errorMessage);
                    this.handleError(response.errorCode)
                    reject(response.errorCode)
                }else{
                    resolve(response)
                }
            })
        })
        return promise
    }

    showGallery = (options = {}) => {
        let promise = new Promise((resolve, reject) => {
            const customOptions = {...this.options,...options}
            console.log(JSON.stringify(customOptions))
            launchImageLibrary(customOptions, (response) => {
                if (response.didCancel) {
                    FlashManager.showErrorMessage(Strings.CanceledAction,"")
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: >>>', response.errorMessage);
                    this.handleError(response.errorCode)
                    reject(response.errorCode)
                }else{
                    resolve(response)
                }
            })
        })
        return promise
    }

    handleError = (errorCode) => {
        switch (errorCode) {
            case "camera_unavailable":
                FlashManager.showErrorMessage(Strings.CameraNotAvailable)
                break;
            case "permission":
                FlashManager.showErrorMessage(Strings.PermissionRequired, Strings.AllowCameraGalleryPermission)
                break;
            case "others":
                FlashManager.showErrorMessage(Strings.OopsSomethingWentWrong,Strings.PleaseTryAgainLater)
                break;
            default:
                break;
        }
    }

}

export default new ImagePickerManager()