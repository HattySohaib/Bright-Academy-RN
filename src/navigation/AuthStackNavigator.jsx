import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpStep1 from '../screens/SignUpStep1'; // New step 1 screen
import SignUpStep2 from '../screens/SignUpStep2'; // New step 2 screen
import SignUpStep3 from '../screens/SignUpStep3'; // New step 3 screen

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <Stack.Screen
        options={{navigationBarColor: '#F6F6F6'}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{navigationBarColor: '#F6F6F6'}}
        name="SignUpStep1"
        component={SignUpStep1} // First sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: '#F6F6F6'}}
        name="SignUpStep2"
        component={SignUpStep2} // Second sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: '#F6F6F6'}}
        name="SignUpStep3"
        component={SignUpStep3} // Third sign-up step
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
