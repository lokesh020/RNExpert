import * as FlashManager from './FlashManager'
import * as NavigationObject from './NavigationObject'
import * as SpinnerRef from './SpinnerRef'

import WebApi from './networkController/WebApi'
import WebConstants from './networkController/WebConstants'
import ResponseModel from '../models/ResponseModel';


class ApiManager {

    constructor() {

    }

    //Private method
    getAuthToken = async () => {
        const token = ""
        return token ?? null
    }

    makeGetRequest = (isSpinnerShow = false, kApiPath = "", headers = {}) => {
        let promise = new Promise(async (resolve, reject) => {
            let reqUrl = WebConstants.BASE_URL + kApiPath
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": await this.getAuthToken(),
                ...headers
            }
            if (isSpinnerShow) {
                SpinnerRef.show()
            }
            WebApi.getRequest(reqUrl, defaultHeaders).then((response) => {
                if (isSpinnerShow) {
                    SpinnerRef.hide()
                }
                if (response.responseCode == 200) {
                    resolve(response)
                } else {
                    FlashManager.showErrorMessage(response.failureMsg)
                }
            }).catch((errStatus) => {
                if (isSpinnerShow) {
                    SpinnerRef.hide()
                }
                this.handleApiError(errStatus)
                reject(errStatus)
            })
        })
        return promise
    }

    makePostRequest = (isSpinnerShow = false, kApiPath = "", body = {}, headers = {}) => {
        let promise = new Promise(async (resolve, reject) => {
            let reqUrl = WebConstants.BASE_URL + kApiPath
            const defaultHeaders = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Authorization": await this.getAuthToken(),
                ...headers
            }
            if (isSpinnerShow) {
                SpinnerRef.show()
            }
            WebApi.postRequest(reqUrl, body, defaultHeaders).then((response) => {
                if (isSpinnerShow) {
                    SpinnerRef.hide()
                }
                if (response.responseCode == 200) {
                    resolve(response)
                } else {
                    FlashManager.showErrorMessage(response.failureMsg)
                }
            }).catch((errStatus) => {
                if (isSpinnerShow) {
                    SpinnerRef.hide()
                }
                this.handleApiError(errStatus)
                reject(errStatus)
            })
        })
        return promise
    }


    //Error Handling (Private Method)
    handleApiError = (errStatus) => {
        switch (errStatus.statusCode) {
            case 401:

                break;
            case 404:
                FlashManager.showErrorMessage(errStatus.statusMsg)
                break;
            default:
                FlashManager.showErrorMessage(errStatus.statusMsg)
                break;
        }
    }

}




export default new ApiManager();