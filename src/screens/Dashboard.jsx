import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import SubjectCard from '../components/SubjectCard';
import ContinueBtn from '../components/ContinueBtn';
import Map from '../components/Map';
import logo from '../assets/icons/logo.png';

import {useUserData} from '../contexts/UserDataContext';
import Loader from '../components/Loader';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

export default function Dashboard({navigation}) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userData, timeout} = useUserData();
  const {theme} = useThemeContext(); // Get theme colors

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!userData?.exam) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://achieveyouraim.in/api/subjects/exam/${userData?.exam._id}`,
        );
        setSubjects(response.data);
        console.log('Fetched subjects:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    };

    if (userData) {
      fetchSubjects();
    }
  }, [userData]);

  if (loading) {
    return <Loader />;
  }

  if (timeout) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>
          Request timed out. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg}]}>
      {!userData.exam && (
        <View
          style={[
            styles.selectExamContainer,
            {backgroundColor: theme.bgSecondary},
          ]}>
          <Image source={logo} style={styles.logo} />
          <View></View>
          <View style={styles.welcomeContent}>
            <Text style={[styles.welcomeTitle, {color: theme.text}]}>
              Achieve Your Aim
            </Text>
            <Text style={[styles.subtitle, {color: theme.textSecondary}]}>
              By choosing Bright Academy for your exam preparation
            </Text>
          </View>

          <View style={styles.featureGrid}>
            {[
              {
                icon: '📚',
                title: 'Study Material',
                desc: 'Comprehensive notes',
              },
              {
                icon: '✍️',
                title: 'Practice Tests',
                desc: 'Test your knowledge',
              },
              {
                icon: '📊',
                title: 'Track Progress',
                desc: 'Monitor your growth',
              },
              {icon: '🎯', title: 'Set Goals', desc: 'Achieve targets'},
            ].map((feature, index) => (
              <View
                key={index}
                style={[styles.featureCard, {backgroundColor: theme.bg}]}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[styles.featureTitle, {color: theme.text}]}>
                  {feature.title}
                </Text>
                <Text
                  style={[styles.featureDesc, {color: theme.textSecondary}]}>
                  {feature.desc}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.selectExamButton, {backgroundColor: theme.primary}]}
            onPress={() => navigation.navigate('Selection')}>
            <Text style={styles.selectExamText}>Get Started Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {userData.exam && (
        <>
          <Map />
          <ContinueBtn />
          <Text style={[styles.Header, {color: theme.text}]}>
            Your subjects
          </Text>
          <View>
            {subjects.map((subject, ind) => (
              <SubjectCard navigation={navigation} {...subject} key={ind} />
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Header: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 16,
  },
  container: {
    padding: 16,
  },
  selectExamContainer: {
    padding: 20,
    borderRadius: 16,
    marginTop: 32,
    alignItems: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  selectExamButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectExamText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
});
