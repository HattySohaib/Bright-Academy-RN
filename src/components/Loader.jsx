import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#1f1414" />
    </View>
  );
};

export default Loader;
