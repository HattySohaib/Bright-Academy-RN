import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserData} from '../contexts/UserDataContext';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context

const EditProfileScreen = ({navigation}) => {
  const {userData, reloadUserData} = useUserData();
  const {theme} = useThemeContext(); // Get theme values

  const [profile, setProfile] = useState({
    name: '',
    city: '',
    pincode: '',
    exam: '',
    profile_image_url: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setProfile(userData);
    }
  }, [userData]);

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setProfile({...profile, profile_image_url: response.assets[0].uri});
        }
      },
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://achieveyouraim.in/api/users/${userData._id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(profile),
        },
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully!');
        reloadUserData();
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: theme.bg}]}>
      <ScrollView style={[styles.container, {backgroundColor: theme.bg}]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, {color: theme.text}]}>Edit Profile</Text>
          <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
            Update your profile information
          </Text>
        </View>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{
                uri:
                  profile.profile_image_url ||
                  'https://via.placeholder.com/100',
              }}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Text style={styles.editIcon}>
                <Icon name="edit" color="white" size={16} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, {color: theme.textSecondary}]}>Email</Text>
        <TextInput
          value={profile.email}
          editable={false}
          style={[
            styles.input,
            {color: theme.text, backgroundColor: theme.bgSecondary},
          ]}
        />

        <Text style={[styles.label, {color: theme.textSecondary}]}>Name</Text>
        <TextInput
          value={profile.name}
          onChangeText={text => setProfile({...profile, name: text})}
          style={[
            styles.input,
            {color: theme.text, backgroundColor: theme.bgSecondary},
          ]}
        />

        <Text style={[styles.label, {color: theme.textSecondary}]}>City</Text>
        <TextInput
          value={profile.city}
          onChangeText={text => setProfile({...profile, city: text})}
          style={[
            styles.input,
            {color: theme.text, backgroundColor: theme.bgSecondary},
          ]}
        />

        <Text style={[styles.label, {color: theme.textSecondary}]}>
          Pincode
        </Text>
        <TextInput
          value={profile.pincode}
          keyboardType="numeric"
          onChangeText={text => setProfile({...profile, pincode: text})}
          style={[
            styles.input,
            {color: theme.text, backgroundColor: theme.bgSecondary},
          ]}
        />

        <Text style={[styles.label, {color: theme.textSecondary}]}>Exam</Text>
        <View
          style={[
            styles.examContainer,
            {
              backgroundColor: theme.bgSecondary,
            },
          ]}>
          <Text style={[styles.exam, {color: theme.text}]}>
            {profile.exam?.name || 'Select an exam'}
          </Text>
          <Pressable onPress={() => navigation.navigate('Selection')}>
            <Text style={styles.buttonText}>Change</Text>
          </Pressable>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <TouchableOpacity
        onPress={handleSave}
        style={[
          styles.button,
          {backgroundColor: loading ? theme.bgSecondary : '#D7E0FF'},
        ]}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#004fFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 18,
  },
  examContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#ccc',
  },
  exam: {
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#004fFF',
    fontSize: 18,
  },
  bottomSpace: {
    height: 80,
  },
};

export default EditProfileScreen;
