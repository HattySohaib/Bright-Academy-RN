import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

import Loader from '../components/Loader';

export default function SignUpScreen({navigation}) {
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('city', city);
      formData.append('pincode', pincode);

      if (profilePic) {
        formData.append('profilePic', {
          uri: profilePic.uri,
          type: profilePic.type || 'image/jpeg', // specify the MIME type if available, otherwise default to image/jpeg
          name: profilePic.fileName || 'profilePic.jpg', // specify the file name if available, otherwise default to profilePic.jpg
        });
      }
      console.log(formData);
      setLoading(true);
      const response = await axios.post(
        'http://192.168.137.1:5000/api/users/',
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
        navigation.navigate('Login');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      const errorText =
        error.response?.data?.message ||
        'There was an error. Please try again.';
      setErrorMessage(errorText);
    }
  };

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
        console.log(profilePic);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Let’s create your account.</Text>
        <Text style={styles.subtitle}>All fields are compulsory.</Text>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={selectProfilePicture}>
          <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
        </TouchableOpacity>
        {profilePic && <Image source={profilePic} style={styles.profilePic} />}
        <View>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="someone@example.com"
            placeholderTextColor="#B1B1B1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="I am..."
            placeholderTextColor="#B1B1B1"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>
        <View>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="I live in..."
            placeholderTextColor="#B1B1B1"
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
          />
        </View>
        <View>
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Pincode of my address is..."
            placeholderTextColor="#B1B1B1"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignUp}>
          {loading ? (
            <Text style={styles.buttonTxt}>Loading</Text>
          ) : (
            <Text style={styles.buttonTxt}>Next</Text>
          )}
        </Pressable>
      </View>
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
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
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: 'black',
    borderColor: '#DEDEDE',
    backgroundColor: 'white',
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    alignSelf: 'center',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#202020',
  },
  button: {
    backgroundColor: '#FFD362',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 12,
    elevation: 3,
  },
  buttonTxt: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 16,
  },
  blue: {
    color: 'blue',
  },
});
