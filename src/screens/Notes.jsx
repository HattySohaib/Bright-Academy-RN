import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import DownloadButton from '../components/DownloadButton';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

const Notes = ({navigation, route}) => {
  const {theme} = useThemeContext(); // Get theme values

  return (
    <ScrollView style={{backgroundColor: theme.bg}}>
      <View style={[styles.container, {backgroundColor: theme.bg}]}>
        {route.params?.notes.map((note, i) => (
          <DownloadButton key={i} pdfUrl={note.url} buttonName={note.title} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 16,
    gap: 16,
  },
});
