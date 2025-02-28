import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const ChapterList = ({route, navigation}) => {
  const {subjectId} = route.params;

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveProgress = async chapter => {
    await AsyncStorage.setItem('lastchapter', chapter._id);
    await AsyncStorage.setItem('lastchapterName', chapter.name);
    navigation.navigate('Materials', {
      chapterId: chapter._id,
      chapterName: chapter.name,
    });
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `http://192.168.137.1:5000/api/chapters/subject/${subjectId}`,
        );
        setChapters(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchChapters();
  }, [subjectId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error fetching chapters: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subjectName}>Chapters</Text>
      <View style={styles.chapterList}>
        {chapters.map((chapter, index) => (
          <TouchableHighlight
            underlayColor={'#f1f1f1'}
            onPress={() => saveProgress(chapter)}
            key={chapter._id}>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
                width: '100%',
              }}>
              <Text style={styles.chapterIndex}>{index + 1}</Text>
              <Text style={styles.chapterName}>{chapter.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

export default ChapterList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  subjectName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1f4f4f',
  },
  chapterList: {
    backgroundColor: '#f6f6f6',
    height: '100%',
    gap: 12,
    width: '100%',
  },
  chapterName: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    textAlignVertical: 'center',
    color: 'black',
    width: '80%',
  },
  chapterIndex: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFB905',
    color: '#121212',
    fontSize: 24,
    padding: 8,
    width: 48,
    height: 48,
    borderRadius: 5,
    textAlign: 'center',
  },
});
