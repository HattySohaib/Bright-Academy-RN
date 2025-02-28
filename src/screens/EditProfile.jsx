// EditProfile.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

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

  const handleSubmit = async () => {
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

      const response = await axios.put(
        'https://192.168.127.191:5000/api/users/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={styles.input}
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Profile Image</Text>
      {profileImageUrl && (
        <Image source={{uri: profileImageUrl}} style={styles.image} />
      )}
      <Button title="Pick an Image" onPress={selectProfilePicture} />

      <Text style={styles.label}>Selected Board ID</Text>
      <TextInput
        style={styles.input}
        value={selectedBoardId}
        onChangeText={setSelectedBoardId}
      />

      <Text style={styles.label}>Selected Exam ID</Text>
      <TextInput
        style={styles.input}
        value={selectedExamId}
        onChangeText={setSelectedExamId}
      />

      <Button title="Save Changes" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default EditProfile;
