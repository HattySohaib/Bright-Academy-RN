import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Downloads from '../screens/Downloads';
import Search from '../screens/Search';
import Dashboard from '../screens/Dashboard';

import Icon from '../components/Icon';
import Topbar from '../components/Topbar';
import {View, Text, ActivityIndicator} from 'react-native';
import {useUserData} from '../contexts/UserDataContext';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const {userData, loading, timeout} = useUserData();

  if (loading) {
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (timeout) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>
          Request timed out. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({route}) => ({
        header: () => (
          <Topbar
            dpUrl={userData?.profile_image_url}
            examName={userData?.examName}
          />
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFB905',
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name == 'Search') iconName = 'bell-outline';
          if (route.name == 'Dashboard') iconName = 'view-dashboard-outline';
          if (route.name == 'Downloads')
            iconName = 'arrow-down-bold-box-outline';
          return <Icon name={iconName} size={30} color={color} />;
        },
        tabBarIconStyle: {
          aspectRatio: 1,
        },
        tabBarStyle: {
          backgroundColor: '#202020',
          height: 60,
        },
        tabBarItemStyle: {
          height: 50,
        },
      })}>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Downloads" component={Downloads} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
