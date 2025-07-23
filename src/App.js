import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext.js';
import AppNavigator from './navigation/AppNavigator.jsx';
import {UserDataProvider} from './contexts/UserDataContext.js';
import {ThemeProvider} from './contexts/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserDataProvider>
          <AppNavigator />
        </UserDataProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
