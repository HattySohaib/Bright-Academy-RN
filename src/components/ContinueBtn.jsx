import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from './Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ContinueBtn = () => {
  const navigation = useNavigation();
  const [lastChapter, setLastChapter] = useState(null);
  const [lastChapterName, setLastChapterName] = useState(null);

  useEffect(() => {
    const lastchapter = async () => {
      const lc = await AsyncStorage.getItem('lastchapter');
      const ln = await AsyncStorage.getItem('lastchapterName');
      if (lc && ln) {
        setLastChapter(lc);
        setLastChapterName(ln);
      }
    };
    lastchapter();
  }, []);

  if (lastChapter) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Materials', {
            chapterId: lastChapter,
            chapterName: lastChapterName,
          });
        }}
        style={styles.continueBtn}>
        <Text style={styles.Btntxt}>Continue where you left off</Text>
        <Icon name={'chevron-right'} size={20} color={'#151515'} />
      </Pressable>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: '#FFDA7A',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  Btntxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#1f1f1f',
    textAlignVertical: 'center',
    marginBottom: -2,
  },
});

export default ContinueBtn;
