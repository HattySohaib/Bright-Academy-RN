import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useThemeContext} from '../contexts/ThemeContext';

export default function EmailVerification({navigation, route}) {
  const {theme} = useThemeContext();
  const {email, name, profilePic, fromForgotPassword} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (counter > 0) {
      interval = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete verification code');
      return;
    }

    setLoading(true);
    try {
      setError('');
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/verify-otp',
        {
          email,
          otp: otpValue,
        },
      );

      if (response.status === 200) {
        if (fromForgotPassword) {
          // Navigate to reset password screen
          navigation.navigate('ResetPassword', {
            email,
            otp: otpValue,
          });
        } else {
          // Navigate to signup step 2 for normal registration flow
          navigation.navigate('SignUpStep2', {
            email,
            name,
            profilePic,
          });
        }
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(
        error.response?.data?.message ||
          'Invalid verification code. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/send-otp',
        {email, forgotPassword: fromForgotPassword},
      );

      if (response.status === 200) {
        setCounter(60);
        Alert.alert('Success', 'Verification code sent again!');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      Alert.alert('Error', 'Failed to resend verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.text}]}>
          Verify your email
        </Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          We've sent a 6-digit code to {email}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[
              styles.otpInput,
              {
                borderColor: theme.border,
                backgroundColor: theme.bgSecondary,
                color: theme.text,
              },
            ]}
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={value => handleOtpChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <Text style={{color: theme.textSecondary}}>
          Didn't receive the code?
        </Text>
        {counter > 0 ? (
          <Text style={{color: theme.textSecondary}}>Resend in {counter}s</Text>
        ) : (
          <Pressable onPress={resendOtp} disabled={loading}>
            <Text style={styles.resendText}>Resend</Text>
          </Pressable>
        )}
      </View>

      <Pressable style={styles.button} onPress={verifyOtp} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  otpInput: {
    width: 45,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resendText: {
    color: '#003CFF',
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: '#003CFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
});
