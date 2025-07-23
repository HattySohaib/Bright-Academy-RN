import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Materials from './MaterialsTabNavigator';

import ChapterList from '../screens/ChapterList';
import EditProfile from '../screens/EditProfile';
import Selection from '../screens/Selection';
import Dashboard from '../screens/Dashboard';
import AdmissionScreen from '../screens/AdmissionScreen';
import AdmissionSuccessScreen from '../screens/AdmissionSuccessScreen';

import Topbar from '../components/Topbar';
import {useUserData} from '../contexts/UserDataContext';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

// Import the new screens

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  const {userData} = useUserData();
  const {theme} = useThemeContext(); // Get theme values

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        animation: 'ios',
      }}>
      <Stack.Screen
        options={() => ({
          header: () => (
            <Topbar
              dpUrl={userData?.profile_image_url}
              examName={userData?.examName}
            />
          ),
          navigationBarColor: theme.bg,
        })}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params.subjectName,
          headerShadowVisible: true,
          headerBackVisible: false,
          navigationBarColor: theme.bg,
          headerStyle: {
            backgroundColor: theme.bg,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: theme.text,
          },
          headerTitleAlign: 'center',
        })}
        name="ChapterList"
        component={ChapterList}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          headerBackVisible: false,
          headerTitle: route.params.chapterName,
          navigationBarColor: theme.bg,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.bg,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: theme.text,
          },
          headerTitleAlign: 'center',
        })}
        name="Materials"
        component={Materials}
      />
      <Stack.Screen
        options={() => ({
          headerShown: true,
          headerTitle: 'Edit Profile',
          navigationBarColor: theme.bg,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.bg,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: theme.text,
          },
          headerTitleAlign: 'center',
        })}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={() => ({
          headerShown: false,
          navigationBarColor: theme.bg,
        })}
        name="Selection"
        component={Selection}
      />
      <Stack.Screen
        name="Admission"
        component={AdmissionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdmissionSuccess"
        component={AdmissionSuccessScreen}
        options={{
          title: 'Application Status',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.bg,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: theme.text,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
