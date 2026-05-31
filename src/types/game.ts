import { Lane } from '../constants/gameConstants';

export type ObstacleType = 'barrier' | 'cone';

export interface Obstacle {
  id: string;
  lane: Lane;
  type: ObstacleType;
  active: boolean;
  spawnDistance: number;
}

export interface Coffee {
  id: string;
  lane: Lane;
  active: boolean;
  spawnDistance: number;
}
