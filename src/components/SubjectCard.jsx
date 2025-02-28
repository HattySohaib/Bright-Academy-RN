import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const SubjectCard = ({
  navigation,
  _id,
  name,
  chapterCount,
  videoCount,
  pdfCount,
  dppCount,
}) => {
  const images = {
    Mathematics: require('../assets/icons/Mathematics.png'),
    Physics: require('../assets/icons/Physics.png'),
    Chemistry: require('../assets/icons/Chemistry.png'),
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChapterList', {subjectId: _id, subjectName: name})
      }
      style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.icon} source={images[name]} />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.subheading}>{chapterCount} Chapters</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.smallheading}>{videoCount} Videos</Text>
          <Text style={styles.smallheading}>{pdfCount} PDFs</Text>
          <Text style={styles.smallheading}>{dppCount} DPPs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    color: '#383838',
  },
  card: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheading: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4B4B4B',
  },
  smallheading: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#4B4B4B',
  },
  imageContainer: {
    backgroundColor: '#FFD362',
    borderRadius: 12,
    padding: 4,
    aspectRatio: 1,
  },
  icon: {
    resizeMode: 'cover',
    height: 110,
    aspectRatio: 1,
  },
  dataContainer: {
    padding: 8,
    paddingLeft: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 3,
  },
});

export default SubjectCard;
