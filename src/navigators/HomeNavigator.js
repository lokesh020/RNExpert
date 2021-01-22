import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {TrendingScreen,SubscriptionScreen,SettingsScreen,DashboardScreen} from '../scenes/'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator({ navigation }) {
    console.log('HomeNavigator>>>>')
    return (
        <Tab.Navigator
            tabBarOptions={{ showLabel: true, activeTintColor: "tomato", inactiveTintColor: "gray" }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color })=>tabBarIcon(color,route),
            })}
        >
            <Stack.Screen name="DashboardStackNav" component={DashboardStackNav} />
            <Stack.Screen name="TrendingScreen" component={TrendingScreen} />
            <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    )

}

function DashboardStackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        </Stack.Navigator>
    )
}


//Tab related functions

function tabBarIcon(color,route) {
    let iconName;
    switch (route.name) {
        case 'DashboardStackNav':
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
    return <Icon name={iconName} size={28} color={color} />
}


export default HomeNavigator