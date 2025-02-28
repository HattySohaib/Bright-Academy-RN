import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

// Dynamic modal component
const Modal = ({isVisible, onClose, title, message, buttonText}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close when tapping outside
      onBackButtonPress={onClose} // Close on Android back button
      animationIn="slideInUp" // Slide in animation
      animationOut="slideOutDown" // Slide out animation
      backdropColor="rgba(0, 0, 0, 0.5)" // Darken background
      backdropOpacity={0.7} // Adjust backdrop opacity
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          {title}
        </Text>
        <Text style={{fontSize: 16, marginBottom: 20}}>{message}</Text>
        <TouchableOpacity
          onPress={onClose}
          style={{
            backgroundColor: '#007bff',
            padding: 12,
            borderRadius: 5,
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{color: '#fff'}}>{buttonText || 'Close'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Modal;
