import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

export default function Controller({onNext, onPrv}) {
  const playBackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused');
  useEffect(() => {
    if (playBackState === 'playing' || playBackState === 3) {
      setIsPlaying('playing');
    } else if (playBackState === 'paused' || playBackState === 2) {
      setIsPlaying('paused');
    } else {
      setIsPlaying('loading');
    }
  }, [playBackState]);

  const renderPlayPauseBtn = () => {
    switch (isPlaying) {
      case 'playing':
        return <MaterialIcons name="pause" size={45} color="#fff" />;
      case 'paused':
        return <MaterialIcons name="play-arrow" size={45} color="#fff" />;
      default:
        return <ActivityIndicator size={40} color="#ffffff" />;
    }
  };
  const onPlayPause = async () => {
    const state = await TrackPlayer.getState();
    console.log('controller.playBackState', playBackState, state);
    if (playBackState === 'playing' || playBackState === 3) {
      TrackPlayer.pause();
    } else if (playBackState === 'paused' || playBackState === 2) {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons name="skip-previous" size={45} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {renderPlayPauseBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <MaterialIcons name="skip-next" size={45} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 260,
  },
});
