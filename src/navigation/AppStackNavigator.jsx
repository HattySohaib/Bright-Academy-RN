import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeTabNavigator from './HomeTabNavigator';
import ChapterList from '../screens/ChapterList';
import Materials from '../screens/Materials';
import EditProfile from '../screens/EditProfile';
import Selection from '../screens/Selection';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}>
      <Stack.Screen
        options={{navigationBarColor: '#202020'}}
        name="HomeTabs"
        component={HomeTabNavigator}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params.subjectName,
          headerShadowVisible: false,
          navigationBarColor: '#f6f6f6',
          headerStyle: {
            backgroundColor: '#f6f6f6',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: '#121212',
          },
          headerTitleAlign: 'center',
        })}
        name="ChapterList"
        component={ChapterList}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params.chapterName,
          navigationBarColor: '#f6f6f6',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f6f6f6',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: '#121212',
          },
          headerTitleAlign: 'center',
        })}
        name="Materials"
        component={Materials}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Edit Profile',
          navigationBarColor: '#f6f6f6',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f6f6f6',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: '#121212',
          },
          headerTitleAlign: 'center',
        })}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Select Course',
          navigationBarColor: '#f6f6f6',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f6f6f6',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: '#121212',
          },
          headerTitleAlign: 'center',
        })}
        name="Selection"
        component={Selection}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
