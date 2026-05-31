import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameStatus, useGameStore } from '../store/useGameStore';
import { Player } from '../components/Player';
import { Obstacle } from '../components/Obstacle';
import { Coffee } from '../components/Coffee';
import { Background } from '../components/Background';
import { HomeOverlay } from '../components/HomeOverlay';
import { GameOverOverlay } from '../components/GameOverOverlay';
import { useGameLoop } from '../hooks/useGameLoop';
import { useDifficulty } from '../hooks/useDifficulty';

export const GameScreen = () => {
  const { status, setStatus, obstacles, coffees, score } = useGameStore();
  
  const { globalDistance } = useGameLoop();
  useDifficulty();

  return (
    <View style={styles.container}>
      <Background globalDistance={globalDistance} />
      {status === 'idle' && <HomeOverlay />}
      {status === 'game_over' && <GameOverOverlay />}
      <Text style={styles.score}>Score: {score}</Text>
      {coffees.map(coffee => (
        <Coffee key={coffee.id} coffee={coffee} globalDistance={globalDistance} />
      ))}
      {obstacles.map(obs => (
        <Obstacle key={obs.id} obstacle={obs} globalDistance={globalDistance} />
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
