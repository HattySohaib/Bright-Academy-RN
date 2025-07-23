import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

const LoginScreen = ({navigation}) => {
  const {theme} = useThemeContext(); // Get theme values
  const {login} = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/login',
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
    <ScrollView
      style={[styles.scrollView, {backgroundColor: theme.bg}]}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.title, {color: theme.text}]}>
            Let's sign you in.
          </Text>
          <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
            Enter your details to access your account.
          </Text>
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <View>
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
              placeholder="Minimum 8 characters"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <Text
            style={[styles.forgot, {color: theme.text}]}
            onPress={() => navigation.navigate('ForgotPassword')}>
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
          style={[styles.link, {color: theme.text}]}
          onPress={() => navigation.navigate('SignUpStep1')}>
          Don't have an account? <Text style={styles.blue}>Register here.</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
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
  error: {
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
    color: '#003CFF',
    textDecorationLine: 'underline',
  },
});
