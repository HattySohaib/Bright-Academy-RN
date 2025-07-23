import {StyleSheet, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dpp from '../screens/Dpp';
import Notes from '../screens/Notes';
import LectureStack from './LectureStack';
import Loader from '../components/Loader';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

const Tab = createMaterialTopTabNavigator();

const Materials = ({route, navigation}) => {
  const {chapterId} = route.params;
  const {theme} = useThemeContext(); // Get theme values

  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await axios.get(
          `https://achieveyouraim.in/api/study-materials/chapter/${chapterId}`,
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
    return (
      <Text style={{color: theme.error}}>
        Error fetching study materials: {error}
      </Text>
    );
  }

  const videos = studyMaterials.filter(
    material => material.material_type === 'video',
  );

  const notes = studyMaterials.filter(
    material => material.material_type === 'pdf',
  );

  const dpps = studyMaterials.filter(
    material => material.material_type === 'dpp',
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarIndicatorStyle: {
          backgroundColor: theme.primary,
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
        },
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
        initialParams={{dpps: dpps}}
      />
    </Tab.Navigator>
  );
};

export default Materials;
