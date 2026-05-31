import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { DifficultyConfig } from '../constants/game';

export const useDifficulty = () => {
  const status = useGameStore(state => state.status);
  const speed = useGameStore(state => state.speed);
  const setSpeed = useGameStore(state => state.setSpeed);
  const spawnInterval = useGameStore(state => state.spawnInterval);
  const setSpawnInterval = useGameStore(state => state.setSpawnInterval);

  useEffect(() => {
    if (status !== 'playing') return;

    const intervalId = setInterval(() => {
      if (speed < DifficultyConfig.MAX_SPEED) {
        setSpeed(speed + DifficultyConfig.SPEED_INCREMENT);
        
        const newSpawnInterval = Math.max(
          DifficultyConfig.MIN_SPAWN_INTERVAL_MS,
          spawnInterval * 0.9 // Decrease spawn interval by 10% each time
        );
        setSpawnInterval(newSpawnInterval);
      }
    }, DifficultyConfig.SPEED_INCREMENT_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [status, speed, spawnInterval, setSpeed, setSpawnInterval]);
};
