import { Lane } from '../constants/gameConstants';

export type ObstacleType = 'barrier' | 'cone';

export interface Obstacle {
  id: string;
  lane: Lane;
  type: ObstacleType;
  active: boolean;
}
