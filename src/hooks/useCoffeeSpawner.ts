import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { COFFEE_SPAWN_INTERVAL, LANES, Lane } from '../constants/gameConstants';
import { Coffee } from '../types/game';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useCoffeeSpawner = () => {
  const status = useGameStore((state) => state.status);
  const addCoffee = useGameStore((state) => state.addCoffee);
  const obstacles = useGameStore((state) => state.obstacles);
  // Using ref to prevent stale closures and unneeded re-renders on every obstacle change
  const obstaclesRef = useRef(obstacles);
  obstaclesRef.current = obstacles;

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'playing') {
      timerRef.current = setInterval(() => {
        const lanes: Lane[] = [LANES.LEFT, LANES.CENTER, LANES.RIGHT];
        let randomLane = lanes[Math.floor(Math.random() * lanes.length)];

        // Simple overlap prevention check:
        // Try not to spawn coffee in the same lane as an obstacle that just spawned.
        // We'll check the most recent obstacle. If they match lanes, shift to another lane.
        const recentObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
        if (recentObstacle && recentObstacle.lane === randomLane) {
            randomLane = lanes.find(l => l !== randomLane) || LANES.CENTER;
        }

        const newCoffee: Coffee = {
          id: generateId(),
          lane: randomLane,
          active: true,
          spawnDistance: 0,
        };

        addCoffee(newCoffee);
      }, COFFEE_SPAWN_INTERVAL);
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
  }, [status, addCoffee]);
};
