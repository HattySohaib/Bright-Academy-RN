import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useThemeContext} from '../contexts/ThemeContext'; // Import theme context

const Youtube = ({navigation, route}) => {
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');
  const {theme} = useThemeContext(); // Get theme values

  useEffect(() => {
    if (route.params?.videoURL) {
      // Extract video ID if a full URL was passed
      let id = route.params.videoURL;

      // Extract YouTube video ID using regex patterns
      if (id.includes('youtube.com/watch')) {
        // Format: youtube.com/watch?v=VIDEO_ID
        const match = id.match(/[?&]v=([^&]+)/);
        id = match ? match[1] : id;
      } else if (id.includes('youtu.be/')) {
        // Format: youtu.be/VIDEO_ID
        const match = id.match(/youtu\.be\/([^?]+)/);
        id = match ? match[1] : id;
      }

      setVideoId(id);
      console.log('Video ID set to:', id);
    } else {
      console.log('No video URL provided');
    }
  }, [route.params]);

  const onStateChange = useCallback(
    state => {
      if (state === 'ended') {
        setPlaying(false);
        alert('Video has finished playing!');
      }
    },
    [setPlaying],
  );

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 12,
        backgroundColor: theme.bg,
        height: '100%',
      }}>
      {videoId ? (
        <YoutubePlayer
          height={200}
          width={'90%'}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          webViewProps={{
            javaScriptEnabled: true,
            domStorageEnabled: true,
          }}
        />
      ) : (
        <Text style={{color: theme.text, fontFamily: 'Poppins-Regular'}}>
          No video to play
        </Text>
      )}
      <Text
        style={{
          color: theme.text, // Fixed color property
          fontFamily: 'Poppins-Regular',
          marginTop: 10,
          textAlign: 'center',
          paddingHorizontal: 15,
        }}>
        {route.params?.videoTitle || 'No title available'}
      </Text>
    </View>
  );
};

export default Youtube;
