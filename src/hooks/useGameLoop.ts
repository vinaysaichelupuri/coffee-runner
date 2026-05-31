import { useFrameCallback, useSharedValue, runOnJS } from 'react-native-reanimated';
import { useGameStore } from '../store/useGameStore';
import { getRandomLane, generateId } from '../utils/spawner';
import { isColliding, BoundingBox } from '../utils/collision';
import { playerFractionalLane } from '../utils/globalShared';
import { Lane } from '../constants/gameConstants';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const PLAYER_Y = height - 120; // Example offset based on styling
const PLAYER_HEIGHT = 80;

interface ActiveEntity {
  id: string;
  lane: Lane;
  spawnDistance: number;
  type: 'obstacle' | 'coffee';
  active: boolean;
}

// Top-level JS functions to safely call Zustand from Reanimated worklets
const spawnEntityOnJS = (isCoffee: boolean, id: string, lane: Lane, spawnDistance: number) => {
  if (isCoffee) {
    useGameStore.getState().addCoffee({ id, lane, active: true, spawnDistance });
  } else {
    const type = Math.random() > 0.5 ? 'barrier' : 'cone';
    useGameStore.getState().addObstacle({ id, lane, type, active: true, spawnDistance });
  }
};

const cleanupEntityOnJS = (type: 'coffee' | 'obstacle', id: string) => {
  if (type === 'coffee') useGameStore.getState().removeCoffee(id);
  else useGameStore.getState().removeObstacle(id);
};

const handleCollisionOnJS = (type: 'coffee' | 'obstacle', id: string) => {
  if (type === 'coffee') useGameStore.getState().handleCoffeeCollision(id);
  else useGameStore.getState().handleObstacleCollision(id);
};

export const useGameLoop = () => {
  const status = useGameStore(state => state.status);
  const speed = useGameStore(state => state.speed);
  const spawnInterval = useGameStore(state => state.spawnInterval);
  
  const globalDistance = useSharedValue(0);
  const lastSpawnTime = useSharedValue(0);
  const entitiesSV = useSharedValue<ActiveEntity[]>([]);

  useFrameCallback((frameInfo) => {
    if (status !== 'playing') return;

    // Time delta based movement for consistent speed regardless of frame drops
    const delta = frameInfo.timeSincePreviousFrame || 16.6;
    // Speed is units per 16.6ms (approx 1 frame at 60fps)
    globalDistance.value += speed * (delta / 16.6);

    // Spawning logic
    if (frameInfo.timestamp - lastSpawnTime.value > spawnInterval) {
      lastSpawnTime.value = frameInfo.timestamp;
      
      const lane = getRandomLane() as any;
      const isCoffee = Math.random() < 0.2; // 20% chance for coffee
      const spawnDistance = globalDistance.value;
      const id = generateId();
      
      const newEntity: ActiveEntity = { id, lane, type: isCoffee ? 'coffee' : 'obstacle', spawnDistance, active: true };
      entitiesSV.value = [...entitiesSV.value, newEntity];
      
      runOnJS(spawnEntityOnJS)(isCoffee, id, lane, spawnDistance);
    }

    // Collision detection and cleanup logic
    let updatedEntities = false;
    const currentEntities = entitiesSV.value;
    const nextEntities: ActiveEntity[] = [];

    for (let i = 0; i < currentEntities.length; i++) {
      const entity = currentEntities[i];
      if (!entity.active) continue;

      const translateY = globalDistance.value - entity.spawnDistance;
      
      // C1 Fix: Off-screen cleanup
      if (translateY > height + 100) {
        updatedEntities = true;
        runOnJS(cleanupEntityOnJS)(entity.type, entity.id);
        continue;
      }

      // Collision check
      const entityHeight = entity.type === 'coffee' ? 60 : 100;
      const entityBox: BoundingBox = { lane: entity.lane, y: translateY, height: entityHeight };
      const playerBox: BoundingBox = { lane: playerFractionalLane.value, y: PLAYER_Y, height: PLAYER_HEIGHT };

      if (isColliding(playerBox, entityBox, 0.6)) {
        updatedEntities = true;
        runOnJS(handleCollisionOnJS)(entity.type, entity.id);
        continue;
      }

      nextEntities.push(entity);
    }

    if (updatedEntities) {
      entitiesSV.value = nextEntities;
    }
  });

  return { globalDistance };
};
