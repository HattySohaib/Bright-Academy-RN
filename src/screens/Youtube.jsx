import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

const Youtube = ({navigation, route}) => {
  const [playing, setPlaying] = useState(false);
  console.log(route);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      alert('Video has finished playing!');
    }
  }, []);
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: 12,
      }}>
      <YoutubePlayer
        height={200}
        width={'90%'}
        play={playing}
        videoId={route.params?.videoURL}
        onChangeState={onStateChange}
      />
      <Text
        style={{
          color: 'blacks',
          fontFamily: 'Poppins-Regular',
        }}>
        {route.params?.videoTitle}
      </Text>
    </View>
  );
};

export default Youtube;
