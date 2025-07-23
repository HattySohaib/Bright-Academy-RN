import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useThemeContext} from '../contexts/ThemeContext';

export default function SignUpStep2({navigation, route}) {
  const {email, name, profilePic} = route.params; // Get data from the previous step
  const {theme} = useThemeContext();

  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!mobile || !gender || !city) {
      setErrorMessage('All fields are required.');
    } else {
      navigation.navigate('SignUpStep3', {
        email,
        name,
        profilePic,
        mobile,
        gender,
        city,
      });
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>
          Step 2: Add Details
        </Text>
        <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
          Please fill in your details.
        </Text>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View>
        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Mobile Number
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
            placeholder="123-456-7890"
            placeholderTextColor={theme.textSecondary}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>
            Gender
          </Text>
          <Picker
            selectedValue={gender}
            style={[
              styles.input,
              {
                borderColor: theme.border,
                backgroundColor: theme.bg,
                color: theme.text,
              },
            ]}
            onValueChange={setGender}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View>
          <Text style={[styles.label, {color: theme.textSecondary}]}>City</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: theme.border,
                backgroundColor: theme.bg,
                color: theme.text,
              },
            ]}
            placeholder="City Name"
            placeholderTextColor={theme.textSecondary}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonTxt}>Next</Text>
        </Pressable>
      </View>
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
