import {storeData,getData, removeData} from './LocalAsyncStorage'

export const setLoginData = async (data) => {
    await storeData('@LOGIN_DATA', data)
    return
}

export const getLoginData = async () => {
    const loginData = await getData('@LOGIN_DATA')
    if (loginData !== null) {
        return JSON.parse(loginData)
    }else{
        console.log('login data is null')
        return loginData
        
    }
}

export const removeLoginData = async () => {
    await removeData('@LOGIN_DATA')
}
