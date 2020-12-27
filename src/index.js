import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {SplashScreen,LoginScreen} from '_scenes/index'

const RootStack = createStackNavigator()

const App = () => {
  return  (
    <NavigationContainer>
        <RootStack.Navigator screenOptions={{ animationEnabled: false, headerShown : false }}>
            <RootStack.Screen name = {"SplashScreen"} component = {SplashScreen}/>
            <RootStack.Screen name = {"LoginScreen"} component = {LoginScreen}/>
        </RootStack.Navigator>
    </NavigationContainer>
  )
} 

export default App;