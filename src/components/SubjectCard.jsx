import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

const truncate = (str, n) => {
  return str.length > n ? str.slice(0, n) + '...' : str;
};

const SubjectCard = ({
  navigation,
  _id,
  name,
  image,
  chapterCount,
  videoCount,
  pdfCount,
  dppCount,
}) => {
  const {theme} = useThemeContext(); // Get theme values
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChapterList', {subjectId: _id, subjectName: name})
      }
      style={[styles.card, {backgroundColor: theme.bgSecondary}]}>
      <View style={[styles.imageContainer, {backgroundColor: theme.primary}]}>
        <Image
          style={styles.icon}
          source={{
            uri: image,
          }}
        />
      </View>

      <View style={styles.dataContainer}>
        <Text style={[styles.heading, {color: theme.text}]}>
          {truncate(name, 15)}
        </Text>
        <Text style={[styles.subheading, {color: theme.textSecondary}]}>
          {chapterCount} Chapters
        </Text>
        <View style={styles.detailContainer}>
          <Text style={[styles.smallheading, {color: theme.textSecondary}]}>
            {videoCount} Videos
          </Text>
          <Text style={[styles.smallheading, {color: theme.textSecondary}]}>
            {pdfCount} PDFs
          </Text>
          <Text style={[styles.smallheading, {color: theme.textSecondary}]}>
            {dppCount} DPPs
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
  },
  card: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheading: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  smallheading: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  imageContainer: {
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
