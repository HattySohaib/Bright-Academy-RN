import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React from 'react';
import DownloadButton from '../components/DownloadButton';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

const Dpp = ({navigation, route}) => {
  const {theme} = useThemeContext(); // Get theme values

  return (
    <ScrollView style={{backgroundColor: theme.bg}}>
      <View style={[styles.container, {backgroundColor: theme.bg}]}>
        {route.params?.dpps?.map((item, i) => (
          <DownloadButton key={i} pdfUrl={item.url} buttonName={item.title} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Dpp;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 16,
    gap: 16,
  },
});
