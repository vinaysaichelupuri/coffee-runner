export const LANES = {
  LEFT: -1,
  CENTER: 0,
  RIGHT: 1,
} as const;

export type Lane = typeof LANES[keyof typeof LANES];
