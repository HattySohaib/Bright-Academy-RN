import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import AppStackNavigator from './AppStackNavigator';
import CustomDrawer from '../components/CustomDrawer';
import About from '../screens/About';
import Selection from '../screens/Selection';
import EditProfile from '../screens/EditProfile';
import Password from '../screens/Password';

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
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Password" component={Password} />
      <Drawer.Screen name="Selection" component={Selection} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
