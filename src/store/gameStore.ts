import { create } from 'zustand';

export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface GameState {
  score: number;
  highScore: number;
  speed: number;
  activeLane: number; // 0, 1, 2
  status: GameStatus;
  
  // Actions
  setScore: (score: number) => void;
  incrementScore: (amount: number) => void;
  setHighScore: (highScore: number) => void;
  setSpeed: (speed: number) => void;
  setActiveLane: (lane: number) => void;
  setStatus: (status: GameStatus) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  highScore: 0,
  speed: 1.0,
  activeLane: 1, // Start in middle lane
  status: 'idle',

  setScore: (score) => set({ score }),
  incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
  setHighScore: (highScore) => set({ highScore }),
  setSpeed: (speed) => set({ speed }),
  setActiveLane: (lane) => set({ activeLane: lane }),
  setStatus: (status) => set({ status }),
  resetGame: () => set({ score: 0, speed: 1.0, activeLane: 1, status: 'playing' }),
}));
