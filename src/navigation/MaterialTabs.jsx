import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LectureStack from './LectureStack';
import Dpp from '../screens/Dpp';
import Notes from '../screens/Notes';

const Tab = createMaterialTopTabNavigator();

const MaterialTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LectureTab" component={LectureStack} />
      <Tab.Screen name="NotesTab" component={Notes} />
      <Tab.Screen name="DPPTab" component={Dpp} />
    </Tab.Navigator>
  );
};

export default MaterialTabs;

const styles = StyleSheet.create({});
