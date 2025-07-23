import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useThemeContext} from '../contexts/ThemeContext';

const ResetPassword = ({navigation, route}) => {
  const {theme} = useThemeContext();
  const {email} = route.params; // otp is now 6 digits

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const validate = () => {
    const newErrors = {
      newPassword: '',
      confirmPassword: '',
    };
    let isValid = true;

    if (!passwords.newPassword) {
      newErrors.newPassword = 'Please enter a new password';
      isValid = false;
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      isValid = false;
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'https://achieveyouraim.in/api/users/reset-password',
        {
          email,
          newPassword: passwords.newPassword,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been reset successfully!', [
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error resetting password:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to reset password. Please try again.',
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>
          Create New Password
        </Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          Your new password must be different from previous passwords
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.label, {color: theme.textSecondary}]}>
          New Password
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
          placeholder="Enter new password"
          placeholderTextColor={theme.textSecondary}
          value={passwords.newPassword}
          onChangeText={text => setPasswords({...passwords, newPassword: text})}
          secureTextEntry
        />
        {errors.newPassword ? (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        ) : null}

        <Text style={[styles.label, {color: theme.textSecondary}]}>
          Confirm New Password
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
          placeholder="Confirm new password"
          placeholderTextColor={theme.textSecondary}
          value={passwords.confirmPassword}
          onChangeText={text =>
            setPasswords({...passwords, confirmPassword: text})
          }
          secureTextEntry
        />
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
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
    borderRadius: 8,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    height: 50,
  },
  button: {
    backgroundColor: '#003CFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
});

export default ResetPassword;
