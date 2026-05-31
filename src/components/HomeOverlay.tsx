import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { playClick } from '../hooks/useAudio';

export const HomeOverlay = () => {
  const { setStatus, highScore } = useGameStore();

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Coffee Runner</Text>
      <Text style={styles.scoreText}>High Score: {highScore}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          playClick();
          setStatus('playing');
        }}
      >
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  scoreText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
