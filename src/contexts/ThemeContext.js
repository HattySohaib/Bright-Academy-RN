import React, {createContext, useContext, useState, useEffect} from 'react';
import {Appearance} from 'react-native';

// Define light and dark mode themes
const lightTheme = {
  bg: '#f6f6f6',
  text: '#000000',
  primary: '#FFC736',
  textSecondary: '#626262',
  bgSecondary: '#EDEDED',
  border: '#EEEEEE',
};

const darkTheme = {
  bg: '#202020',
  text: '#FFFFFF',
  primary: '#FFD362',
  textSecondary: '#C0C0C0',
  bgSecondary: '#303030',
  border: '#404040',
};

// Create Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({children}) => {
  const systemColorScheme = Appearance.getColorScheme(); // Get system theme
  const [theme, setTheme] = useState(
    systemColorScheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => subscription.remove();
  }, []);

  // Toggle between themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use Theme
export const useThemeContext = () => useContext(ThemeContext);
