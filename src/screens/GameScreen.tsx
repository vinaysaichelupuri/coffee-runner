import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useGameStore } from '../store/useGameStore';
import { Player } from '../components/Player';
import { Obstacle } from '../components/Obstacle';
import { Coffee } from '../components/Coffee';
import { useObstacleSpawner } from '../hooks/useObstacleSpawner';
import { useCoffeeSpawner } from '../hooks/useCoffeeSpawner';

export const GameScreen = () => {
  const { status, setStatus, obstacles, coffees, score } = useGameStore();
  
  useObstacleSpawner();
  useCoffeeSpawner();

  useEffect(() => {
    // For testing/starting the game
    if (status === 'idle') {
      setStatus('playing');
    }
  }, [status, setStatus]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {coffees.map(coffee => (
        <Coffee key={coffee.id} coffee={coffee} />
      ))}
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
