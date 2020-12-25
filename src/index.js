import 'react-native-gesture-handler';
import React from 'react';
import {View,Text} from 'react-native';
import {HelloWorld} from '_atoms';
import {Typography,Colors} from '_styles';
import UserModel from "../src/models/UserModel";
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  const userModel = new UserModel({username:"Lokesh The Developer"})
  return  (
    <View style = {{justifyContent:"center",alignItems:"center", flex:1,flexDirection:"row"}}>
      <HelloWorld name = {userModel.username} style = {{fontSize: Typography.FONT_SIZE_16}}/>
      <Icon name="customerservice" size={80} color={Colors.SUCCESS}/>
    </View>
  )
} 

export default App;