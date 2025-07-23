import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {useThemeContext} from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutScreen = () => {
  const {theme} = useThemeContext();

  const renderListItem = (iconName, title, description) => (
    <View style={[styles.listItem, {borderColor: theme.border}]}>
      <Icon
        name={iconName}
        size={24}
        color={theme.primary}
        style={styles.icon}
      />
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, {color: theme.text}]}>{title}</Text>
        <Text
          style={[styles.listItemDescription, {color: theme.textSecondary}]}>
          {description}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={[styles.header, {backgroundColor: theme.bgSecondary}]}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, {color: theme.text}]}>Bright Academy</Text>
        <Text style={[styles.tagline, {color: theme.primary}]}>
          Achieve Your Aim
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, {backgroundColor: theme.bgSecondary}]}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            Our Story
          </Text>
          <Text style={[styles.paragraph, {color: theme.text}]}>
            <Text style={styles.bold}>Bright Academy</Text> is a premier
            educational institute dedicated to shaping bright futures. Founded
            by <Text style={styles.bold}>Md. Mostafa</Text> in{' '}
            <Text style={styles.bold}>
              Shaktigarh, Kolkata (Near Shaktigarh High School)
            </Text>
            , we have been empowering students in India and beyond with{' '}
            <Text style={styles.bold}>quality education</Text> for school,
            board, and competitive exams like{' '}
            <Text style={styles.bold}>JEE and NEET</Text>.
          </Text>
        </View>

        <View style={[styles.card, {backgroundColor: theme.bgSecondary}]}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            Features
          </Text>
          {renderListItem(
            'video',
            'Lectures & Study Notes',
            'Access expert-led video lectures and notes',
          )}
          {renderListItem(
            'file-document',
            'Practice Papers & DPPs',
            'Daily practice problems and mock tests',
          )}
          {renderListItem(
            'clock',
            'Flexible Learning',
            'Study anytime, anywhere at your own pace',
          )}
          {renderListItem(
            'star',
            'Premium Content',
            'Free resources and premium courses',
          )}
        </View>

        <View style={[styles.card, {backgroundColor: theme.bgSecondary}]}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            Why Choose Us
          </Text>
          {renderListItem(
            'book-open-variant',
            'Comprehensive Material',
            'Well-structured courses and notes',
          )}
          {renderListItem(
            'chart-line',
            'Exam-Focused',
            'Tailored for board exams, JEE, and NEET',
          )}
        </View>
      </View>

      <Text style={[styles.footer, {color: theme.primary}]}>
        Join us today and take your first step towards success!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  title: {
    fontSize: 24,

    fontFamily: 'Poppins-Medium',
  },
  tagline: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  listItemDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});

export default AboutScreen;
