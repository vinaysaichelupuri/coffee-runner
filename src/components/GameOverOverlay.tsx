import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { playClick } from '../hooks/useAudio';

export const GameOverOverlay = () => {
  const { score, highScore, resetGame, setStatus } = useGameStore();

  const handleRestart = () => {
    playClick();
    resetGame();
    setStatus('playing');
  };

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>High Score: {highScore}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRestart}
      >
        <Text style={styles.buttonText}>RESTART</Text>
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
    backgroundColor: 'rgba(36, 30, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    
    zIndex: 1000,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  scoreText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
