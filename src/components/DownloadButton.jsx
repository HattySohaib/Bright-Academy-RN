import React, {useState} from 'react';
import {PermissionsAndroid, Alert, Platform} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Notifications} from 'react-native-notifications';
import {showAlert, showError, showSuccess} from './Toast';

// 🔹 Function to Get the Unique Download Path
const getUniqueDownloadPath = async fileName => {
  const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  let uniquePath = downloadPath;
  let counter = 1;

  while (await RNFS.exists(uniquePath)) {
    const extIndex = fileName.lastIndexOf('.');
    const name = extIndex !== -1 ? fileName.substring(0, extIndex) : fileName;
    const ext = extIndex !== -1 ? fileName.substring(extIndex) : '';
    uniquePath = `${RNFS.DownloadDirectoryPath}/${name} (${counter})${ext}`;
    counter++;
  }

  return uniquePath;
};

// 🔹 Request Storage Permission (For Android < 33)
const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Number(Platform.Version) < 33) {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      return (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

// 🔹 DownloadButton Component
const DownloadButton = ({
  buttonName,
  pdfUrl,
  fileName = buttonName + '.pdf',
}) => {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      showAlert('Permission Denied', 'Storage access is required.');
      return;
    }

    setDownloading(true);
    showAlert('Downloading file...');

    try {
      const filePath = await getUniqueDownloadPath(fileName);

      const downloadResult = await RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: filePath,
        progressInterval: 500, // Update every 500ms
        progress: res => {
          const progress = res.bytesWritten / res.contentLength;
          showAlert(`Progress: ${progress * 100}%`);
        },
      }).promise;

      if (downloadResult.statusCode === 200) {
        showSuccess('Download Complete', `File saved at:\n${filePath}`);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error(error);
      showError('Download Failed', 'Unable to download the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        gap: 2,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          gap: 2,
          alignItems: 'center',
        }}
        onPress={downloadFile}
        disabled={downloading}>
        {downloading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={styles.title}>{fileName}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DownloadButton;

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#FFE399',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    padding: 8,
    width: '90%',
    color: 'black',
    textAlign: 'left',
    borderRadius: 8,
  },
});
