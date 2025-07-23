import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';

export default function SignUpStep3({navigation, route}) {
  const {email, name, profilePic, mobile, gender, city} = route.params; // Get data from the previous steps
  const {theme} = useThemeContext();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword || !schoolName || !pincode) {
      setErrorMessage('All fields are required.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('city', city);
        formData.append('schoolName', schoolName);
        formData.append('pincode', pincode);

        if (profilePic) {
          formData.append('profilePic', {
            uri: profilePic.uri,
            type: profilePic.type || 'image/jpeg', // specify the MIME type if available, otherwise default to image/jpeg
            name: profilePic.fileName || 'profilePic.jpg', // specify the file name if available, otherwise default to profilePic.jpg
          });
        }
        setLoading(true);
        const response = await axios.post(
          'https://achieveyouraim.in/api/users/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setLoading(false);
        if (response.status === 200) {
          console.log('User successfully created.');
          setErrorMessage('');
          navigation.navigate('SignUpStatus', {
            success: true,
            message:
              'Your account has been created successfully! You can now login.',
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        const errorMessage =
          'There was an error creating your account. Please try again.';
        setErrorMessage(errorMessage);
        navigation.navigate('SignUpStatus', {
          success: false,
          message: errorMessage,
        });
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <Text style={[styles.title, {color: theme.text}]}>
        Step 3: Complete Sign Up
      </Text>
      <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
        Set your account password.
      </Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View>
        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Password
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
            placeholder="********"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Confirm Password
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
            placeholder="********"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            School Name
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
            placeholder="School Name"
            placeholderTextColor={theme.textSecondary}
            value={schoolName}
            onChangeText={setSchoolName}
          />
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Pincode
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
            placeholder="Pincode"
            placeholderTextColor={theme.textSecondary}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color={'#003CFF'} />
        ) : (
          <Text style={styles.buttonTxt}>Submit</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    color: '#151515',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#383838',
    fontFamily: 'Poppins-Light',
  },
  error: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  label: {
    paddingLeft: 2,
    fontFamily: 'Poppins-Medium',
    color: '#4b4b4b',
    fontSize: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: 'black',
    borderColor: '#DEDEDE',
    backgroundColor: 'white',
    marginBottom: 16,
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
});
