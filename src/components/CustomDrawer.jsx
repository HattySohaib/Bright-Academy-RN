import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Pressable,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useUserData} from '../contexts/UserDataContext';
import {useAuthContext} from '../contexts/AuthContext';
import {useThemeContext} from '../contexts/ThemeContext'; // Import Theme Context
import Icon from 'react-native-vector-icons/Feather';

const CustomDrawer = ({navigation}) => {
  const {userData, loading} = useUserData();
  const {logout} = useAuthContext();
  const {theme, toggleTheme, isDarkMode} = useThemeContext();
  const [currentTheme, setCurrentTheme] = useState(isDarkMode);

  const handleLogout = () => {
    logout();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setCurrentTheme(!currentTheme);
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, {backgroundColor: theme.bg}]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={[
        styles.drawerContainer,
        {backgroundColor: theme.bg},
      ]}>
      <View>
        {/* Header Section */}
        <View
          style={[
            styles.header,
            {backgroundColor: theme.bgSecondary || '#EDEDED'},
          ]}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={styles.closeButton}>
            <Icon name="chevron-left" color={theme.text} size={24} />
            <Text style={[styles.closeText, {color: theme.text}]}>Close</Text>
          </Pressable>

          <Image
            style={styles.profileImage}
            source={{
              uri:
                userData?.profile_image_url ||
                'https://cdn-icons-png.flaticon.com/512/8847/8847419.png',
            }}
          />
          <Text style={[styles.name, {color: theme.text}]}>
            {userData?.name || 'Username'}
          </Text>
          <Text style={[styles.email, {color: theme.textSecondary}]}>
            {userData?.email || 'Email'}
          </Text>
        </View>

        {/* Navigation Items */}
        <View>
          <DrawerItem
            icon={() => <Icon name="home" size={20} color={theme.text} />}
            label={'Home'}
            onPress={() => navigation.navigate('HomeDraw')}
            labelStyle={[styles.label, {color: theme.text}]}
          />
          <DrawerItem
            icon={() => <Icon name="user" size={20} color={theme.text} />}
            label={'Profile'}
            onPress={() => navigation.navigate('EditProfile')}
            labelStyle={[styles.label, {color: theme.text}]}
          />
          <DrawerItem
            icon={() => <Icon name="lock" size={20} color={theme.text} />}
            label={'Password'}
            onPress={() => navigation.navigate('Password')}
            labelStyle={[styles.label, {color: theme.text}]}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name={currentTheme ? 'sun' : 'moon'}
                size={20}
                color={theme.text}
              />
            )}
            label={currentTheme ? 'Light Mode' : 'Dark Mode'}
            onPress={handleThemeToggle}
            labelStyle={[styles.label, {color: theme.text}]}
          />
          <DrawerItem
            icon={() => <Icon name="info" size={20} color={theme.text} />}
            label={'About Us'}
            onPress={() => navigation.navigate('About')}
            labelStyle={[styles.label, {color: theme.text}]}
          />
        </View>
      </View>

      {/* Logout Section */}
      <View style={styles.logoutContainer}>
        <DrawerItem
          icon={() => <Icon name="log-out" size={20} color="red" />}
          label={'Logout'}
          onPress={handleLogout}
          labelStyle={[styles.logout, {color: 'red'}]}
          style={{backgroundColor: '#FFE6E6'}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'space-between',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    gap: 5,
    marginTop: -5,
  },
  closeButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 3,
    marginBottom: 16,
  },
  closeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: -2,
  },
  profileImage: {
    borderRadius: 100,
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: -5,
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 3,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  editText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginBottom: -2,
    color: '#202020',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: -14,
  },
  logout: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});
