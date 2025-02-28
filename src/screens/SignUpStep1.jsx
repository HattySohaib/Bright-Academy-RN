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
import {launchImageLibrary} from 'react-native-image-picker';

export default function SignUpStep1({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleNext = () => {
    if (!email || !name) {
      setErrorMessage('All fields are required.');
    } else {
      navigation.navigate('SignUpStep2', {email, name, profilePic});
    }
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
          style={styles.profileContainer}
          onPress={selectProfilePicture}>
          {profilePic ? (
            <Image source={{uri: profilePic.uri}} style={styles.profilePic} />
          ) : (
            <Text style={styles.uploadText}>+</Text>
          )}
        </TouchableOpacity>
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

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonTxt}>Next</Text>
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
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 12,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  uploadText: {
    fontSize: 40,
    color: '#777',
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
    color: '#202020',
  },
  blue: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
