import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';

export default function SignUpStatusScreen({navigation, route}) {
  const {success, message} = route.params;
  const {theme} = useThemeContext();

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <Text
        style={[
          styles.title,
          {color: theme.text, color: success ? '#4CAF50' : '#F44336'},
        ]}>
        {success ? 'Success!' : 'Oops!'}
      </Text>
      <Text style={[styles.message, {color: theme.textSecondary}]}>
        {message}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonTxt}>Go to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#D7E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  buttonTxt: {
    fontFamily: 'Poppins-Medium',
    color: '#003CFF',
    fontSize: 16,
  },
});
