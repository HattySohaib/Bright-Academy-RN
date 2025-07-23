import {Pressable, StyleSheet, ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

const ChapterList = ({route, navigation}) => {
  const {subjectId} = route.params;
  const {theme} = useThemeContext(); // Get theme values

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
          `https://achieveyouraim.in/api/chapters/subject/${subjectId}`,
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
    return (
      <Text style={{color: theme.error}}>Error fetching chapters: {error}</Text>
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg}]}>
      <Text style={[styles.subjectName, {color: theme.primaryText}]}>
        Chapters
      </Text>
      <View style={styles.chapterList}>
        {chapters.map((chapter, index) => (
          <Pressable
            underlayColor={theme.highlight}
            onPress={() => saveProgress(chapter)}
            key={chapter._id}>
            <View style={styles.chapterRow}>
              <Text
                style={[
                  styles.chapterIndex,
                  {backgroundColor: theme.primary, color: 'black'},
                ]}>
                {index + 1}
              </Text>
              <Text
                style={[
                  styles.chapterName,
                  {backgroundColor: theme.bgSecondary, color: theme.text},
                ]}>
                {chapter.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChapterList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subjectName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  chapterList: {
    height: '100%',
    gap: 12,
    width: '100%',
  },
  chapterRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  chapterName: {
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    paddingLeft: 16,
    textAlignVertical: 'center',
    width: '80%',
  },
  chapterIndex: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    padding: 8,
    width: 48,
    height: 48,
    borderRadius: 5,
    textAlign: 'center',
  },
});
