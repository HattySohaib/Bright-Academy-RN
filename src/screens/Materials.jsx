import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dpp from '../screens/Dpp';
import Notes from '../screens/Notes';
import LectureStack from '../navigation/LectureStack';
import Loader from '../components/Loader';

const Tab = createMaterialTopTabNavigator();

const Materials = ({route, navigation}) => {
  const {chapterId} = route.params;

  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await axios.get(
          `http://192.168.137.1:5000/api/study-materials/chapter/${chapterId}`,
        );
        setStudyMaterials(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, [chapterId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error fetching study materials: {error}</Text>;
  }

  const videos = studyMaterials.filter(
    material => material.material_type === 'video',
  );

  const notes = studyMaterials.filter(
    material => material.material_type === 'pdf',
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFD362',
        tabBarIndicatorStyle: {
          backgroundColor: '#FFD362',
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: '#202020',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
        },
        tabBarInactiveTintColor: 'white',
      }}
      initialRouteName="LectureTab">
      <Tab.Screen
        options={{
          tabBarLabel: 'Lectures',
        }}
        name="LectureTab"
        component={LectureStack}
        initialParams={{videos: videos}}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notes',
        }}
        name="NotesTab"
        component={Notes}
        initialParams={{notes: notes}}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'DPPs',
        }}
        name="DPPTab"
        component={Dpp}
      />
    </Tab.Navigator>
  );
};

export default Materials;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    gap: 12,
  },
});
