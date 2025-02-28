import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect, useContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutState] = useState(false); // Timeout state

  useEffect(() => {
    const loadUser = async () => {
      let timeoutId;
      try {
        setLoading(true);
        setTimeoutState(false);

        // Set a timeout for loading
        timeoutId = setTimeout(() => {
          setLoading(false);
          setTimeoutState(true);
        }, 5000); // Timeout after 5 seconds

        const userId = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');

        if (userId && token) {
          setUser({userId: JSON.parse(userId), token: JSON.parse(token)});
        } else {
          setUser(null); // No user data found
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        clearTimeout(timeoutId); // Clear the timeout if data loads successfully
        setLoading(false); // Set loading to false when the operation completes
      }
    };

    loadUser();
  }, []);

  const login = async userData => {
    let timeoutId;
    try {
      setLoading(true);
      setTimeoutState(false);

      // Set a timeout for login
      timeoutId = setTimeout(() => {
        setLoading(false);
        setTimeoutState(true);
      }, 5000); // Timeout after 5 seconds

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData.userId));
      await AsyncStorage.setItem('token', JSON.stringify(userData.token));
    } catch (error) {
      console.error('Failed to log in:', error);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const logout = async () => {
    let timeoutId;
    try {
      setLoading(true);
      setTimeoutState(false);

      // Set a timeout for logout
      timeoutId = setTimeout(() => {
        setLoading(false);
        setTimeoutState(true);
      }, 5000); // Timeout after 5 seconds

      setUser(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('lastchapter');
      await AsyncStorage.removeItem('lastchapterName');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{user, loading, timeout, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);
