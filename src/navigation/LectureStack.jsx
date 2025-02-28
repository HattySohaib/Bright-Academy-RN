import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lectures from '../screens/Lectures';
import Youtube from '../screens/Youtube';

const Stack = createNativeStackNavigator();

const LectureStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios',
      }}
      initialRouteName="VideoList">
      <Stack.Screen
        name="VideoList"
        component={Lectures}
        initialParams={{videos: route.params?.videos}}
      />
      <Stack.Screen name="Youtube" component={Youtube} />
    </Stack.Navigator>
  );
};

export default LectureStack;
