export const DifficultyConfig = {
  INITIAL_SPEED: 5,        // Units per frame (or relative speed multiplier)
  MAX_SPEED: 15,           // Maximum speed cap
  SPEED_INCREMENT: 0.5,    // Amount to increase speed
  SPEED_INCREMENT_INTERVAL_MS: 5000, // How often to increase speed

  INITIAL_SPAWN_INTERVAL_MS: 2000,
  MIN_SPAWN_INTERVAL_MS: 500,
};

export const GameConstants = {
  LANE_WIDTH: 100, // Approximate lane width for math
  OBSTACLE_HEIGHT: 100,
  COFFEE_HEIGHT: 60,
  PLAYER_HEIGHT: 80,
  PLAYER_WIDTH: 60,
  OBSTACLE_WIDTH: 80,
  COFFEE_WIDTH: 40,
};
