import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdmissionSuccessScreen = ({navigation}) => {
  const {theme} = useThemeContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={styles.contentContainer}>
        <View style={[styles.iconContainer, {backgroundColor: theme.primary}]}>
          <Icon name="check" size={60} color="white" />
        </View>
        <Text style={[styles.title, {color: theme.text}]}>
          Application Submitted Successfully
        </Text>
        <Text style={[styles.message, {color: theme.secondaryText}]}>
          Thank you for your application. Our team will review it and contact
          you shortly regarding the next steps.
        </Text>
        <Text style={[styles.contactInfo, {color: theme.text}]}>
          For any queries, please contact:
        </Text>
        <Text style={[styles.contactNumber, {color: theme.primary}]}>
          +91 98765 43210
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primary}]}
        onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  contactInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 8,
  },
  contactNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
  },
});

export default AdmissionSuccessScreen;
