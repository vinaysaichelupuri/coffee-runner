import { create } from 'zustand';
import { Obstacle, Coffee } from '../types/game';

export type GameStatus = 'idle' | 'playing' | 'game_over';

export interface GameState {
  score: number;
  highScore: number;
  speed: number;
  activeLane: number;
  status: GameStatus;
  obstacles: Obstacle[];
  coffees: Coffee[];
  
  setScore: (score: number) => void;
  setHighScore: (highScore: number) => void;
  setSpeed: (speed: number) => void;
  setActiveLane: (lane: number) => void;
  setStatus: (status: GameStatus) => void;
  addObstacle: (obstacle: Obstacle) => void;
  removeObstacle: (id: string) => void;
  clearObstacles: () => void;
  resetGame: () => void;
  addCoffee: (coffee: Coffee) => void;
  removeCoffee: (id: string) => void;
  clearCoffees: () => void;
  collectCoffee: (id: string) => void;
}

const initialState = {
  score: 0,
  highScore: 0,
  speed: 1,
  activeLane: 1,
  status: 'idle' as GameStatus,
  obstacles: [] as Obstacle[],
  coffees: [] as Coffee[],
};

export const useGameStore = create<GameState>()((set) => ({
  ...initialState,

  setScore: (score) => set({ score: Math.max(0, score) }),
  setHighScore: (highScore) => set({ highScore: Math.max(0, highScore) }),
  setSpeed: (speed) => set({ speed: Math.max(0, speed) }),
  setActiveLane: (lane) => {
    if (lane >= 0 && lane <= 2) {
      set({ activeLane: lane });
    }
  },
  setStatus: (status) => set({ status }),
  addObstacle: (obstacle) => set((state) => ({ obstacles: [...state.obstacles, obstacle] })),
  removeObstacle: (id) => set((state) => ({ obstacles: state.obstacles.filter((o) => o.id !== id) })),
  clearObstacles: () => set({ obstacles: [] }),
  addCoffee: (coffee) => set((state) => ({ coffees: [...state.coffees, coffee] })),
  removeCoffee: (id) => set((state) => ({ coffees: state.coffees.filter((c) => c.id !== id) })),
  clearCoffees: () => set({ coffees: [] }),
  collectCoffee: (id) => set((state) => {
    const coffeeExists = state.coffees.some((c) => c.id === id);
    if (!coffeeExists) return {}; // Do nothing if already collected
    return {
      score: state.score + 10,
      coffees: state.coffees.filter((c) => c.id !== id)
    };
  }),
  resetGame: () => set((state) => ({ ...initialState, highScore: state.highScore })), // High score should persist across resets
}));
