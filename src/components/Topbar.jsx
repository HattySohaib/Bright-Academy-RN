import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useUserData} from '../contexts/UserDataContext';

const Topbar = ({dpUrl}) => {
  const navigation = useNavigation();
  const {userData} = useUserData();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.profile}>
        <Image
          style={styles.menuIcon}
          source={{
            uri: dpUrl,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Hi, {userData?.name.split(' ')[0]}</Text>
    </View>
  );
};
1;

export default Topbar;

const styles = StyleSheet.create({
  Header: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    color: '#151515',
    marginTop: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
    gap: 16,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
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
    borderColor: 'grey',
    borderWidth: 1,
    width: 40,
    height: 40,
  },
});
