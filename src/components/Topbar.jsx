import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useUserData} from '../contexts/UserDataContext';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

const Topbar = ({dpUrl}) => {
  console.log(dpUrl);
  const navigation = useNavigation();
  const {userData} = useUserData();
  const {theme} = useThemeContext(); // Get theme colors

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.bg, borderBottomColor: theme.bgSecondary},
      ]}>
      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={[styles.profile, {borderColor: theme.bgSecondary}]}>
          <Image
            style={styles.menuIcon}
            source={{
              uri: dpUrl,
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.text, {color: theme.text}]}>{userData?.name}</Text>
      </View>
      {userData?.exam && (
        <View style={[styles.classtag, {backgroundColor: theme.primary}]}>
          <Text style={styles.classtext}>{userData?.exam?.name}</Text>
        </View>
      )}
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
  profile: {
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: 40,
  },
  classtag: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  classtext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000',
  },
});
