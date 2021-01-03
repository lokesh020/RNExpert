import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {SplashScreen,LoginScreen,HomeScreen, TrendingScreen, SubscriptionScreen, SettingsScreen, AuthLoading} from '_scenes/index'
import * as SessionManager from './utils/SessionManager'

import AuthContext from './contexts/AuthContext'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

enableScreens()

function App () {
  return  (
    <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions = {{headerShown : false,animationEnabled  : false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="RootStackNav" component={RootStackNav} />
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
} 



function RootStackNav({navigation}) {

  const [state, dispatch] = React.useReducer(
    (prevState,action)=>{
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
    },{
      isLoading: true,
      isLoggedIn: false,
      userToken: null,
    }
  )

  React.useEffect(()=>{
      const getAuthToken = async()=>{
        let loginData = await SessionManager.getLoginData()
        dispatch({type: 'RESTORE_TOKEN', token : (loginData !== null) ? loginData.userToken : null})
      }
      getAuthToken()
  },[])

  const authContext = React.useMemo(
    () => ({
      logIn: () => {
        dispatch({ type: 'LOG_IN', token: '123456' });
      },
      logOut: async() => {
        await SessionManager.removeLoginData()
        dispatch({ type: 'LOG_OUT' })
      }
    }),
    []
  );

  return(
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions = {{headerShown : false,animationEnabled:false}}>
          {
           (state.isLoading) ? <Stack.Screen name="AuthLoading" component={AuthLoading} />  : (state.userToken == null) ? 
            <Stack.Screen name="AuthStackNav" component={AuthStackNav} /> : 
            <Stack.Screen name="AppStackNav" component={AppStackNav} />
          }
      </Stack.Navigator>
    </AuthContext.Provider>
  )
  
}




function AuthStackNav() {

  return(
    <Stack.Navigator screenOptions = {{headerShown : false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
  
}


function AppStackNav() {

  return(
    <Tab.Navigator 
      tabBarOptions = {{showLabel:false,activeTintColor:"tomato",inactiveTintColor:"gray"}}
      screenOptions = {({route})=>({
        tabBarIcon : ({color})=>{
          let iconName;
          switch (route.name) {
            case 'HomeStackNav':
              iconName = "home"
              break;
            case 'TrendingScreen':
              iconName = "fire"
              break;
            case 'SubscriptionScreen':
              iconName = "message-video"
              break;
            case 'SettingsScreen':
              iconName = "folder"
              break;
            default:
              break;
          }
          return <Icon name = {iconName} size = {28} color={color} />
        },
        
      })}
    >
      <Stack.Screen name="HomeStackNav" component={HomeStackNav} />
      <Stack.Screen name="TrendingScreen" component={TrendingScreen} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  )
  
}

function HomeStackNav() {
  return (
    <Stack.Navigator screenOptions = {{headerShown:false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}




export default App;