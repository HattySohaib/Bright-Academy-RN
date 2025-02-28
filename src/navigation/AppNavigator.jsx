import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from '../contexts/AuthContext.js';
import DrawerNavigation from './DrawerNavigation.jsx';
import BootSplash from 'react-native-bootsplash';

const AppNavigator = () => {
  const {user} = useAuthContext();

  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <StatusBar backgroundColor="#f6f6f6" barStyle="dark-content" />
      {user ? <DrawerNavigation /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
