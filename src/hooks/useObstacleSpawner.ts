import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { OBSTACLE_SPAWN_INTERVAL, LANES, Lane } from '../constants/gameConstants';
import { Obstacle, ObstacleType } from '../types/game';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useObstacleSpawner = () => {
  const status = useGameStore((state) => state.status);
  const addObstacle = useGameStore((state) => state.addObstacle);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (status === 'playing') {
      timerRef.current = setInterval(() => {
        const lanes: Lane[] = [LANES.LEFT, LANES.CENTER, LANES.RIGHT];
        const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
        const types: ObstacleType[] = ['barrier', 'cone'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        const newObstacle: Obstacle = {
          id: generateId(),
          lane: randomLane,
          type: randomType,
          active: true,
          spawnDistance: 0,
        };

        addObstacle(newObstacle);
      }, OBSTACLE_SPAWN_INTERVAL);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, addObstacle]);
};
