import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

function truncate(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}

const Lectures = ({navigation, route}) => {
  const {theme} = useThemeContext(); // Get theme values

  return (
    <ScrollView style={{backgroundColor: theme.bg}}>
      <View style={[styles.container, {backgroundColor: theme.bg}]}>
        {route.params?.videos.map((video, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              gap: 2,
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: '100%',
                gap: 2,
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('Youtube', {
                  videoURL: video.url,
                  videoTitle: video.title,
                })
              }>
              <Text
                style={[
                  styles.title,
                  {
                    backgroundColor: theme.primary,
                    color: 'black',
                  },
                ]}>
                Lecture {index + 1} : {truncate(video.title, 18)}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Lectures;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    padding: 8,
    width: '90%',
    textAlign: 'left',
    borderRadius: 8,
  },
});
