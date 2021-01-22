import 'react-native-gesture-handler';
import React, { useRef, useEffect } from 'react';
import ErrorBoundary from 'react-native-error-boundary'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';


import { navigationRef, isReadyRef } from './utils/NavigationObject';
import { spinnerRef } from './utils/SpinnerRef';

import { SplashScreenComp } from './scenes/'
import RootNavigator from './navigators/RootNavigator'
import SpinnerModal from './components/SpinnerModal';


enableScreens()

const Stack = createStackNavigator();

function Index() {

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);


  return (
    <SafeAreaProvider>

        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            <Stack.Screen name="SplashScreenComp" component={SplashScreenComp} />
            <Stack.Screen name="RootNavigator" component={RootNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        <SpinnerModal ref = {spinnerRef} />

    </SafeAreaProvider>

  )
}

const App = () => (
  <ErrorBoundary>
    <Index />
    <FlashMessage />
  </ErrorBoundary>
)


export default App;