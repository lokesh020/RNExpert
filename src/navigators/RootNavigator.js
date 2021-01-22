import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from '../contexts/AuthContext';
import * as SessionManager from '../utils/SessionManager';

import AuthLoading from '../scenes/AuthLoading'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'




const Stack = createStackNavigator();

function RootNavigator({ navigation }) {

    const [state, dispatch] = React.useReducer(
        AuthReducer, {
        isLoading: true,
        isLoggedIn: false,
        userToken: null,
    }
    )

    React.useEffect(() => {
        const getAuthToken = async () => {
            let loginData = await SessionManager.getLoginData()
            dispatch({ type: 'RESTORE_TOKEN', token: (loginData !== null) ? loginData.userToken : null })
        }
        getAuthToken()
    }, [])

    const authContext = React.useMemo(
        () => ({
            logIn: () => {
                dispatch({ type: 'LOG_IN', token: '123456' });
            },
            logOut: async () => {
                await SessionManager.removeLoginData()
                dispatch({ type: 'LOG_OUT' })
            }
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
                {
                    (state.isLoading) ? <Stack.Screen name="AuthLoading" component={AuthLoading} /> : (state.userToken == null) ?
                        <Stack.Screen name="AuthNavigator" component={AuthNavigator} /> :
                        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
                }
            </Stack.Navigator>
        </AuthContext.Provider>
    )

}


const AuthReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'LOG_IN':
            return {
                ...prevState,
                isLoggedIn: true,
                userToken: action.token,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                isLoggedIn: false,
                userToken: null,
            };
    }
}


export default RootNavigator
