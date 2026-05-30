import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { Player } from '../components/Player';
import { Obstacle } from '../components/Obstacle';
import { useObstacleSpawner } from '../hooks/useObstacleSpawner';

export const GameScreen = () => {
  const { status, setStatus, obstacles, score } = useGameStore();
  
  useObstacleSpawner();

  useEffect(() => {
    // For testing/starting the game
    if (status === 'idle') {
      setStatus('playing');
    }
  }, [status, setStatus]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {obstacles.map(obs => (
        <Obstacle key={obs.id} obstacle={obs} />
      ))}
      <Player />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  score: {
    position: 'absolute',
    top: 50,
    left: 20,
    color: '#fff',
    fontSize: 24,
    zIndex: 100,
    fontWeight: 'bold',
  }
});
