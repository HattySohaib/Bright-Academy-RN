import axios from 'axios';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import SubjectCard from '../components/SubjectCard';
import ContinueBtn from '../components/ContinueBtn';
import Map from '../components/Map';
import {useUserData} from '../contexts/UserDataContext';
import Loader from '../components/Loader';

export default function Dashboard({navigation}) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userData, timeout} = useUserData();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `http://192.168.137.1:5000/api/subjects/exam/${userData?.exam}`,
        );
        setSubjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    };

    if (userData) {
      fetchSubjects();
    }
  }, [userData]);

  if (loading) {
    return <Loader />;
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
    <ScrollView style={styles.container}>
      <Map />
      <ContinueBtn />
      <Text style={styles.Header}>Your subjects</Text>
      <View>
        {subjects.map((subject, ind) => (
          <SubjectCard navigation={navigation} {...subject} key={ind} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Header: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1f1f1f',
    marginTop: 16,
  },
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
});
