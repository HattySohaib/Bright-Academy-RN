import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {useUserData} from '../contexts/UserDataContext';
import {useThemeContext} from '../contexts/ThemeContext';

function Password({navigation}) {
  const {userData} = useUserData();
  const {theme} = useThemeContext();
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!passwords.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
      isValid = false;
    }

    if (!passwords.newPassword) {
      newErrors.newPassword = 'New password is required';
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

  const handleChangePassword = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://achieveyouraim.in/api/users/${userData._id}/change-password`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          }),
        },
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Password updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error || 'Failed to update password');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>Change Password</Text>
        <Text style={[styles.subtitle, {color: theme.text}]}>
          Please enter your current password and choose a new one
        </Text>
      </View>

      <Text style={[styles.label, {color: theme.textSecondary}]}>
        Current Password
      </Text>
      <TextInput
        value={passwords.oldPassword}
        onChangeText={text => setPasswords({...passwords, oldPassword: text})}
        style={[
          styles.input,
          {color: theme.text, backgroundColor: theme.bgSecondary},
        ]}
        secureTextEntry
        placeholder="Enter current password"
        placeholderTextColor={theme.textSecondary}
      />
      {errors.oldPassword ? (
        <Text style={styles.errorText}>{errors.oldPassword}</Text>
      ) : null}

      <Text style={[styles.label, {color: theme.textSecondary}]}>
        New Password
      </Text>
      <TextInput
        value={passwords.newPassword}
        onChangeText={text => setPasswords({...passwords, newPassword: text})}
        style={[
          styles.input,
          {color: theme.text, backgroundColor: theme.bgSecondary},
        ]}
        secureTextEntry
        placeholder="Enter new password"
        placeholderTextColor={theme.textSecondary}
      />
      {errors.newPassword ? (
        <Text style={styles.errorText}>{errors.newPassword}</Text>
      ) : null}

      <Text style={[styles.label, {color: theme.textSecondary}]}>
        Confirm New Password
      </Text>
      <TextInput
        value={passwords.confirmPassword}
        onChangeText={text =>
          setPasswords({...passwords, confirmPassword: text})
        }
        style={[
          styles.input,
          {color: theme.text, backgroundColor: theme.bgSecondary},
        ]}
        secureTextEntry
        placeholder="Confirm new password"
        placeholderTextColor={theme.textSecondary}
      />
      {errors.confirmPassword ? (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleChangePassword}
        style={styles.button}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Update Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 24,
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
    marginBottom: 8,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default Password;
