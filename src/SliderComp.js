import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

export default function SliderComp() {
  const {position, duration} = useProgress();

  const handleChange = val => {
    console.log(val);
    TrackPlayer.seekTo(val);
  };

  const formatTime = secs => {
    if (isNaN(secs)) {
      return '00:00';
    }
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{width: 320, height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, .5)"
        thumbTintColor="#fff"
        onSlidingComplete={handleChange}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(position)}</Text>
        <Text style={styles.timer}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timer: {
    color: '#fff',
    fontSize: 16,
  },
});
