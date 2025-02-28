import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import logo from '../assets/icons/logo.png';
import Icon from './Icon';

const Map = () => {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.details}>
        <Text style={styles.header}>Bright Academy</Text>
        <Text style={styles.address}>
          <Icon name={'google-maps'} size={10} color={'#151515'} /> Shaktigarh,
          Kolkata
        </Text>
      </View>
      <Icon name={'chevron-right'} size={20} color={'#151515'} />
    </Pressable>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginVertical: 16,
    marginTop: 0,
  },
  logo: {
    aspectRatio: 1,
    flex: 0.15,
  },
  details: {
    flex: 0.8,
  },
  header: {
    color: '#232323',
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
  },
  address: {
    marginTop: -5,
    color: '#4b4b4b',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
