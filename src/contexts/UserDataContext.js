// contexts/UserDataContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAuthContext} from './AuthContext';

// Create the UserDataContext
const UserDataContext = createContext();

// UserDataProvider component
export const UserDataProvider = ({children}) => {
  const {user} = useAuthContext(); // Read userId from AuthContext
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutState] = useState(false); // New timeout state

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        let timeoutId;

        try {
          setLoading(true);
          setTimeoutState(false); // Reset timeout state

          // Start a timeout timer for 5 seconds
          timeoutId = setTimeout(() => {
            setLoading(false);
            setTimeoutState(true); // Set timeout state to true
          }, 5000); // Adjust duration as needed (5000 ms = 5 seconds)

          // Fetch user data from the backend
          const response = await fetch(
            `http://192.168.137.1:5000/api/users/${user.userId}`,
          );
          const data = await response.json();

          // If data is successfully fetched before the timeout, update the state
          setUserData(data);
          clearTimeout(timeoutId); // Clear the timeout
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          clearTimeout(timeoutId); // Ensure timeout is cleared
          setLoading(false); // Set loading to false
        }
      };
      fetchUserData();
      console.log(userData);
    }
  }, [user]);

  return (
    <UserDataContext.Provider value={{userData, loading, timeout}}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to access UserDataContext
export const useUserData = () => useContext(UserDataContext);
