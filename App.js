import  React , {Component}from 'react';
import { Button, View,AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home'
import Login from './src/screens/LoginScreen'
import ChapPoint from './screens/chapPoint'
import Video from './screens/video'
import Profile from './screens/profile'
const Stack = createStackNavigator();
import Clipboard from '@react-native-community/clipboard';

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="ChapPoint" component={ChapPoint} />
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Profile" component={Profile} />



    </Stack.Navigator>
  );
}

export default class App extends Component{
  componentDidMount(){
    AppState.addEventListener("change", this._handleAppStateChange);

  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    console.log("clipboard");
    Clipboard.setString('hello world');
  };



  render(){
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
}