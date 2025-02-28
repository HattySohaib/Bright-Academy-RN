import {
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useUserData} from '../contexts/UserDataContext';
import edit from '../assets/icons/edit.png';
import left from '../assets/icons/left.png';
import {useAuthContext} from '../contexts/AuthContext';
import logIcon from '../assets/icons/logout.png';

const CustomDrawer = ({navigation}) => {
  const {userData, loading} = useUserData();
  const {logout} = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EDEDED',
            padding: 12,
            gap: 5,
            marginTop: -5,
          }}>
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              gap: 3,
              marginBottom: 16,
            }}>
            <Image style={{height: 15, width: 15}} source={left} />
            <Text
              style={{
                fontSize: 16,
                color: '#DFA100',
                fontFamily: 'Poppins-Regular',
                marginBottom: -2,
              }}>
              close
            </Text>
          </Pressable>
          <Image
            style={{
              borderRadius: 100,
              width: 100,
              height: 100,
              borderWidth: 3,
              borderColor: 'white',
            }}
            source={{
              uri:
                userData?.profile_image_url ||
                'https://cdn-icons-png.flaticon.com/512/8847/8847419.png',
            }}
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              textAlign: 'center',
              marginBottom: -5,
            }}>
            {userData?.name || 'Username'}
          </Text>
          <Text
            style={{
              color: '#626262',
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              textAlign: 'center',
              marginBottom: 3,
            }}>
            {userData?.email || 'Email'}
          </Text>
          <Pressable
            style={{
              backgroundColor: '#202020',
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 3,
            }}>
            <Image style={{height: 15, width: 15}} source={edit} />
            <Text
              style={{
                fontSize: 11,
                color: 'white',
                fontFamily: 'Poppins-Regular',
                marginBottom: -2,
              }}>
              Edit Profile
            </Text>
          </Pressable>
        </View>
        <View>
          <DrawerItem
            label={'Home'}
            onPress={() => {
              navigation.navigate('HomeDraw');
            }}
            labelStyle={styles.label}
          />
          <DrawerItem
            label={'About'}
            onPress={() => {
              navigation.navigate('About');
            }}
            labelStyle={styles.label}
          />
          <DrawerItem
            label={'Settings'}
            onPress={() => {
              navigation.navigate('Settings');
            }}
            labelStyle={styles.label}
          />
        </View>
      </View>
      <View style={{borderTopColor: '#e0e0e0', borderTopWidth: 1}}>
        <DrawerItem
          icon={() => (
            <Image style={{height: 20, width: 20}} source={logIcon} />
          )}
          label={'Logout'}
          onPress={() => {
            handleLogout();
          }}
          labelStyle={styles.logout}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingLeft: 10,
  },
  aboutContainer: {
    padding: 20,
  },
  aboutHead: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  aboutSubHead: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  logout: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'red',
  },
});
