import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      Alert.alert('Permission Denied', 'Storage access is required.');
      return;
    }

    setDownloading(true);
    Alert.alert('Download Status', 'Downloading file...');

    try {
      const filePath = await getUniqueDownloadPath(fileName);

      const downloadResult = await RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: filePath,
        progressInterval: 500, // Update every 500ms
        progress: res => {
          const progress = res.bytesWritten / res.contentLength;
          Alert.alert(
            'Download Status',
            `Progress: ${Math.floor(progress * 100)}%`,
          );
        },
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert('Download Complete', `File saved at:\n${filePath}`);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Download Failed', 'Unable to download the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={downloadFile}
        disabled={downloading}>
        {downloading ? (
          <ActivityIndicator color="black" />
        ) : (
          <>
            <MaterialCommunityIcons name="download" size={24} color="black" />
            <Text style={styles.title}>{fileName}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DownloadButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFE399',
    padding: 10,
    width: '90%',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
});
