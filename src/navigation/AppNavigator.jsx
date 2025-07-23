import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from './AuthStackNavigator.jsx';
import {useAuthContext} from '../contexts/AuthContext.js';
import DrawerNavigation from './DrawerNavigation.jsx';
import BootSplash from 'react-native-bootsplash';
import {useThemeContext} from '../contexts/ThemeContext.js';

const AppNavigator = () => {
  const {user} = useAuthContext();
  const {theme} = useThemeContext();
  console.log(theme);

  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <StatusBar
        backgroundColor={theme.bg}
        barStyle={theme.bg == '#f6f6f6' ? 'dark-content' : 'light-content'}
      />
      {user ? <DrawerNavigation /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
