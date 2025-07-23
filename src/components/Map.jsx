import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import logo from '../assets/icons/logo.png';
import Icon from './Icon';
import {useThemeContext} from '../contexts/ThemeContext';

const Map = () => {
  const {theme} = useThemeContext();
  const navigation = useNavigation();
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('admissionStatus');
        setHasApplied(!!status);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, []);

  const handlePress = () => {
    navigation.navigate('Admission');
  };

  return (
    <Pressable
      style={[styles.container, {backgroundColor: theme.bgSecondary}]}
      onPress={handlePress}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.details}>
        <Text style={[styles.header, {color: theme.text}]}>Bright Academy</Text>
        <View style={styles.addressRow}>
          <Text style={[styles.address, {color: theme.textSecondary}]}>
            <Icon name={'google-maps'} size={10} color={theme.text} />{' '}
            Shaktigarh, Kolkata
          </Text>
        </View>
      </View>
      <Icon name={'chevron-right'} size={20} color={theme.text} />
    </Pressable>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
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
    flex: 0.75,
  },
  header: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
  },
  address: {
    marginTop: -5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
