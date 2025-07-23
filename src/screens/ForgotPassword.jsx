import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useThemeContext} from '../contexts/ThemeContext';

const ForgotPassword = ({navigation}) => {
  const {theme} = useThemeContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // Send OTP request
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/forgot-password',
        {email, forgotPassword: true},
      );

      if (response.status === 200) {
        setLoading(false);
        navigation.navigate('EmailVerification', {
          email,
          fromForgotPassword: true,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending OTP:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to send OTP. Try again.',
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>Forgot Password</Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          Enter your email address to receive a verification code
        </Text>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View>
        <Text style={[styles.label, {color: theme.textSecondary}]}>
          Email address
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.bgSecondary,
              color: theme.text,
            },
          ]}
          placeholder="someone@example.com"
          placeholderTextColor={theme.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendOTP}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#003CFF" />
          ) : (
            <Text style={styles.buttonText}>Send Verification Code</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.backToLogin, {color: theme.text}]}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#D7E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#004fFF',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  backToLogin: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
});

export default ForgotPassword;
