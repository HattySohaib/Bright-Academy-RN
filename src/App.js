import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext.js';
import AppNavigator from './navigation/AppNavigator.jsx';
import {UserDataProvider} from './contexts/UserDataContext.js';
import Toast from './components/Toast.jsx';

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AppNavigator />
        <Toast />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
