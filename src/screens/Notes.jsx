import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import DownloadButton from '../components/DownloadButton';

const Notes = ({navigation, route}) => {
  return (
    <ScrollView style={{backgroundColor: '#f6f6f6'}}>
      <View style={styles.container}>
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
    backgroundColor: '#f6f6f6',
  },
});
