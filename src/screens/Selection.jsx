import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Selection = () => {
  const [boards, setBoards] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  console.log(selectedExam);

  const getAllBoards = async () => {
    try {
      const boards = await axios.get('http://192.168.137.1:5000/api/boards/');
      console.log(boards.data);
      setBoards(boards.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Which exam are you preparing for?</Text>
      {boards.map((board, index) => (
        <View key={index}>
          <Text style={styles.boardHeader}>{board.name}</Text>
          <View style={styles.examCont}>
            {board.exams.map((exam, index) => (
              <TouchableOpacity
                onPress={() => setSelectedExam(exam._id)}
                key={index}>
                <Text
                  style={
                    selectedExam === exam._id
                      ? styles.selected
                      : styles.examHeader
                  }>
                  {exam.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  Header: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
    color: '#151515',
    marginTop: 16,
  },
  boardHeader: {
    backgroundColor: '#FFE399',
    borderRadius: 5,
    fontSize: 24,
    padding: 8,
    textAlignVertical: 'center',
    color: 'black',
    textAlign: 'center',
  },
  examHeader: {
    fontSize: 18,
    color: '#151515',
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#151515',
  },
  examCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 8,
  },
  selected: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#202020',
    marginTop: 8,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
  },
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
});
