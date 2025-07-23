import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import {useUserData} from '../contexts/UserDataContext';

const AdmissionScreen = ({navigation}) => {
  const {theme} = useThemeContext();
  const {userData} = useUserData();
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    class: userData?.exam.name || '',
    board: '',
    exam_id: userData?.exam._id || '',
  });
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        if (userData) {
          // Fetch admission status from API
          const response = await fetch(
            `https://achieveyouraim.in/api/admissions/student/${userData._id}`,
          );

          if (response.ok) {
            const statusData = await response.json();
            console.log('Application Status:', statusData);
            setApplicationStatus(statusData);
          }
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleDeleteRequest = async () => {
    if (!applicationStatus || !userData?._id) return;

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to withdraw your admission request?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://achieveyouraim.in/api/admissions/${applicationStatus._id}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );

              if (response.ok) {
                setApplicationStatus(null);
                Alert.alert(
                  'Success',
                  'Your admission request has been withdrawn.',
                );
              } else {
                const errorData = await response.json();
                throw new Error(
                  errorData.message || 'Failed to delete admission request',
                );
              }
            } catch (error) {
              console.error('Error deleting admission request:', error);
              Alert.alert(
                'Error',
                'Failed to withdraw your admission request. Please try again later.',
              );
            }
          },
        },
      ],
    );
  };

  const handleSubmit = async () => {
    // Validation - only require phone, class, board, and exam_id as per schema
    if (
      !formData.phone ||
      !formData.class ||
      !formData.board ||
      !formData.exam_id
    ) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      // Prepare application data according to schema
      const applicationData = {
        user_id: userData?._id,
        exam_id: formData.exam_id,
        phone: formData.phone,
        class: formData.class,
        board: formData.board,
      };

      // Send data to the API endpoint
      const response = await fetch(
        'https://achieveyouraim.in/api/admissions/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        },
      );

      // Check if response is successful
      if (response.ok) {
        // Update local state with the response data
        const responseData = await response.json();
        setApplicationStatus(responseData);

        // Navigate to success screen
        navigation.navigate('AdmissionSuccess');
      } else {
        // Handle API error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert(
        'Error',
        'Failed to submit application. Please try again later.',
      );
    }
  };

  if (applicationStatus) {
    return (
      <View style={[styles.container, {backgroundColor: theme.bg}]}>
        <Text style={[styles.title, {color: theme.text}]}>
          Application Status
        </Text>

        <View style={[styles.statusCard, {backgroundColor: theme.bgSecondary}]}>
          <Text style={[styles.statusHeader, {color: theme.text}]}>
            Status: {applicationStatus.status.toUpperCase()}
          </Text>
          <Text style={[styles.statusDate, {color: theme.textSecondary}]}>
            Applied on:{' '}
            {new Date(applicationStatus.created_at).toLocaleDateString()}
          </Text>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.textSecondary}]}>
              Class:
            </Text>
            <Text style={[styles.detailValue, {color: theme.text}]}>
              {applicationStatus.class}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.textSecondary}]}>
              Board:
            </Text>
            <Text style={[styles.detailValue, {color: theme.text}]}>
              {applicationStatus.board}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.textSecondary}]}>
              Phone:
            </Text>
            <Text style={[styles.detailValue, {color: theme.text}]}>
              {applicationStatus.phone}
            </Text>
          </View>

          <Text style={[styles.statusInfo, {color: theme.text}]}>
            {applicationStatus.status === 'approved'
              ? 'Congratulations! Your application has been approved.'
              : applicationStatus.status === 'revoked'
              ? 'Your application has been revoked. Please contact us for more information.'
              : 'We will review your application and get back to you shortly.'}
          </Text>

          <Text style={[styles.contactInfo, {color: theme.primary}]}>
            Contact: +91 98765 43210
          </Text>

          <TouchableOpacity
            style={[styles.deleteButton]}
            onPress={handleDeleteRequest}>
            <Text style={styles.deleteButtonText}>Withdraw Application</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg}]}>
      <View>
        <Text style={[styles.title, {color: theme.text}]}>
          Join Bright Academy
        </Text>
        <Text style={[styles.subtitle, {color: theme.text}]}>
          Please confirm your details before applying
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, {color: theme.text}]}>
            Full Name
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.bgSecondary,
                color: theme.textSecondary,
                borderColor: theme.border,
              },
            ]}
            value={formData.name}
            editable={false}
            placeholder="Your full name"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, {color: theme.text}]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.bgSecondary,
                color: theme.textSecondary,
                borderColor: theme.border,
              },
            ]}
            value={formData.email}
            editable={false}
            placeholder="Your email address"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, {color: theme.text}]}>
            Phone Number *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.bgSecondary,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={formData.phone}
            onChangeText={text => handleInputChange('phone', text)}
            placeholder="Your phone number"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, {color: theme.text}]}>Class *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.bgSecondary,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={formData.class}
            onChangeText={text => handleInputChange('class', text)}
            placeholder="Your current class"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, {color: theme.text}]}>Board *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.bgSecondary,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={formData.board}
            onChangeText={text => handleInputChange('board', text)}
            placeholder="Your education board"
            placeholderTextColor={theme.textSecondary}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#D7E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
  },
  submitButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#003CFF',
    fontSize: 16,
  },
  statusCard: {
    padding: 24,
    borderRadius: 12,
    marginVertical: 16,
  },
  statusHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  statusDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    width: 80,
  },
  detailValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    flex: 1,
  },
  statusInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  contactInfo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
  },
});

export default AdmissionScreen;
