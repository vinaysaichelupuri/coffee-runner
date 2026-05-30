export const LANES = {
  LEFT: -1,
  CENTER: 0,
  RIGHT: 1,
} as const;

export type Lane = typeof LANES[keyof typeof LANES];

export const OBSTACLE_SPAWN_INTERVAL = 1500; // ms
export const OBSTACLE_SPEED = 5000; // ms duration for full screen
export const COFFEE_SPAWN_INTERVAL = 3000; // ms
