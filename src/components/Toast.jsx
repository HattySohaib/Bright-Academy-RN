import Toast from 'react-native-toast-message';

const showToast = (type, title, message) => {
  Toast.show({
    type: type, // 'success', 'error', 'info'
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showSuccess = message => showToast('success', 'Success', message);
export const showError = message => showToast('error', 'Error', message);
export const showAlert = message => showToast('info', 'Alert', message);

export default Toast;
