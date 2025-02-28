import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import AppStackNavigator from './AppStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import CustomDrawer from '../components/CustomDrawer';
import About from '../screens/About';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={({navigation}) => <CustomDrawer navigation={navigation} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="HomeDraw" component={AppStackNavigator} />
      <Drawer.Screen name="Settings" component={AuthStackNavigator} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
