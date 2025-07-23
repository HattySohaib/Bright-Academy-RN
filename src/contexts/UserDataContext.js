// contexts/UserDataContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {useAuthContext} from './AuthContext';

// Create the UserDataContext
const UserDataContext = createContext();

// UserDataProvider component
export const UserDataProvider = ({children}) => {
  const {user} = useAuthContext(); // Read userId from AuthContext
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutState] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0); // New state for triggering reloads

  // Function to trigger a reload
  const reloadUserData = useCallback(() => {
    setReloadTrigger(prev => prev + 1); // Increment to trigger useEffect
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        let timeoutId;

        try {
          setLoading(true);
          setTimeoutState(false);

          // Start a timeout timer for 5 seconds
          timeoutId = setTimeout(() => {
            setLoading(false);
            setTimeoutState(true);
          }, 5000);

          // Fetch user data from the backend
          const response = await fetch(
            `https://achieveyouraim.in/api/users/${user.userId}`,
          );
          const data = await response.json();

          setUserData(data);
          clearTimeout(timeoutId); // Clear timeout if successful
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, reloadTrigger]); // Depend on reloadTrigger to force refetch

  return (
    <UserDataContext.Provider
      value={{userData, loading, timeout, reloadUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to access UserDataContext
export const useUserData = () => useContext(UserDataContext);
