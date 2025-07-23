import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpStep1 from '../screens/SignUpStep1'; // New step 1 screen
import SignUpStep2 from '../screens/SignUpStep2'; // New step 2 screen
import SignUpStep3 from '../screens/SignUpStep3'; // New step 3 screen

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EmailVerification from '../screens/EmailVerification';
import {useThemeContext} from '../contexts/ThemeContext';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import SignUpStatusScreen from '../screens/SignUpStatusScreen'; // New status screen

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {theme} = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="ForgotPassword"
        component={ForgotPassword} // Reset password screen
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="ResetPassword"
        component={ResetPassword} // Reset password screen
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="SignUpStep1"
        component={SignUpStep1} // First sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="EmailVerification"
        component={EmailVerification} // Third sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="SignUpStep2"
        component={SignUpStep2} // Second sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="SignUpStep3"
        component={SignUpStep3} // Third sign-up step
      />
      <Stack.Screen
        options={{navigationBarColor: theme.bg}}
        name="SignUpStatus"
        component={SignUpStatusScreen} // Sign-up status screen
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
