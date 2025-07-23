import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

export default function SignUpStep1({navigation}) {
  const {theme} = useThemeContext(); // Get theme values

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to pick an image from the gallery
  const selectProfilePicture = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfilePic(response.assets[0]);
      }
    });
  };

  const handleNext = async () => {
    if (!email || !name || !profilePic) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      // Send OTP request
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/send-otp',
        {email, forgotPassword: false},
      );
      if (response.status === 200) {
        console.log('OTP sent successfully');
        navigation.navigate('EmailVerification', {email, name, profilePic});
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to send OTP. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>
          Let’s create your account.
        </Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          All fields are compulsory.
        </Text>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View>
        <TouchableOpacity
          style={[
            styles.profileContainer,
            {backgroundColor: theme.bgSecondary, borderColor: theme.border},
          ]}
          onPress={selectProfilePicture}>
          {profilePic ? (
            <Image source={{uri: profilePic.uri}} style={styles.profilePic} />
          ) : (
            <Text style={[styles.uploadText, {color: theme.textSecondary}]}>
              <Icon name="camera" size={40} color={theme.textSecondary} />
            </Text>
          )}
        </TouchableOpacity>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Email address
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.border,
                backgroundColor: theme.bg,
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
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Full name
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.border,
                backgroundColor: theme.bg,
                color: theme.text,
              },
            ]}
            placeholder="I am..."
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <Pressable style={styles.button} onPress={handleNext}>
          {loading ? (
            <ActivityIndicator color={'#003CFF'} />
          ) : (
            <Text style={styles.buttonTxt}>Next</Text>
          )}
        </Pressable>
      </View>

      <Text
        style={[styles.link, {color: theme.text}]}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={styles.blue}> Login here.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
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
  },
  error: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: 'red',
  },
  label: {
    paddingLeft: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  uploadText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D7E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
  },
  buttonTxt: {
    fontFamily: 'Poppins-Medium',
    color: '#003CFF',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  blue: {
    color: '#003CFF',
    textDecorationLine: 'underline',
  },
});
