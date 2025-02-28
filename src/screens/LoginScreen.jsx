import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useAuthContext} from '../contexts/AuthContext';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing the error message

  const [loading, setLoading] = useState(false);

  const {login} = useAuthContext();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://192.168.137.1:5000/api/users/login',
        {
          email,
          password,
        },
      );
      setLoading(false);
      if (response.status === 200) {
        console.log('Login successful');
        setErrorMessage('');
        login(response.data);
      }
    } catch (error) {
      setLoading(false);
      const errorText =
        error.response?.data?.message ||
        'There was an error. Please try again.';
      setErrorMessage(errorText);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Let's sign you in.</Text>
        <Text style={styles.subtitle}>
          Enter your details to get access your account.
        </Text>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View>
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
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimum 8 characters"
            placeholderTextColor="#B1B1B1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <Text
          style={styles.forgot}
          onPress={() => navigation.navigate('SignUpStep1')}>
          Forgot Password?
        </Text>
        <Pressable style={styles.button} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color={'#003CFF'} />
          ) : (
            <Text style={styles.buttonTxt}>Login</Text>
          )}
        </Pressable>
      </View>

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignUpStep1')}>
        Don't have an account? <Text style={styles.blue}> Register here.</Text>
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
  error: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  forgot: {
    textAlign: 'right',
    fontSize: 12,
    marginBottom: 16,
    fontFamily: 'Poppins-Medium',
    color: '#383838',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#202020',
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
  blue: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
