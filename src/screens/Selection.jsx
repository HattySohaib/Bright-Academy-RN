import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useUserData} from '../contexts/UserDataContext';
import {useThemeContext} from '../contexts/ThemeContext';

const Selection = ({navigation, route}) => {
  const [boards, setBoards] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const {userData, reloadUserData} = useUserData();
  const [loading, setLoading] = useState(false);
  const {theme} = useThemeContext();

  const getAllBoards = async () => {
    try {
      const response = await axios.get('https://achieveyouraim.in/api/boards/');
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  const handleConfirmSelection = async () => {
    if (!selectedExam || !userData) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'https://achieveyouraim.in/api/users/update-exam-choice',
        {
          userId: userData._id,
          selectedExam,
        },
      );
      console.log(response.data.message || 'Exam choice updated successfully');
      reloadUserData();

      // Go back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating exam choice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: theme.bg}]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.Header, {color: theme.text}]}>
          Choose Your Path
        </Text>
        <Text style={[styles.subHeader, {color: theme.textSecondary}]}>
          Which exam are you preparing for?
        </Text>

        {boards.map((board, index) => (
          <View key={index} style={styles.boardContainer}>
            <Text
              style={[styles.boardHeader, {backgroundColor: theme.primary}]}>
              {board.name}
            </Text>
            <View style={styles.examCont}>
              {board.exams.map((exam, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedExam(exam._id)}
                  key={index}
                  style={[
                    styles.examBox,
                    {
                      borderColor: theme.border,
                      backgroundColor: theme.bg,
                    },
                    selectedExam === exam._id && [
                      styles.selectedBox,
                      {backgroundColor: theme.bgSecondary},
                    ],
                  ]}>
                  <Text
                    style={[
                      styles.examText,
                      {color: theme.textSecondary},
                      selectedExam === exam._id && {color: theme.text},
                    ]}>
                    {exam.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={styles.bottomSpace} />
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          {
            backgroundColor: selectedExam ? theme.primary : theme.bgSecondary,
          },
        ]}
        onPress={handleConfirmSelection}
        disabled={!selectedExam || loading}>
        <Text
          style={[
            styles.confirmButtonText,
            {
              color: selectedExam ? 'black' : 'gray',
            },
          ]}>
          {loading ? 'Saving...' : 'Confirm Selection'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  Header: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    marginTop: 16,
  },
  subHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 24,
  },
  boardContainer: {
    marginBottom: 24,
  },
  boardHeader: {
    fontFamily: 'Poppins-SemiBold',
    borderRadius: 12,
    fontSize: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    color: 'black',
    textAlign: 'center',
  },
  examCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  examBox: {
    width: '47%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedBox: {
    borderColor: '#003CFF',
  },
  examText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomSpace: {
    height: 80,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
});
