import React from 'react';

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ListingScreen from './app/screens/ListingScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './app/screens/ProfileScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import SignInScreen from './app/screens/SignInScreen';
import CameraScreen from './app/screens/CameraScreen';
import UploadImageScreen from './app/screens/UploadImageScreen';
import MapScreen from './app/screens/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    //<WelcomeScreen />
    //<ListingDetailsScreen />
    //<ViewImageScreen />
    //<ListingScreen/>

    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ListingDetailsScreen" component={ListingDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}