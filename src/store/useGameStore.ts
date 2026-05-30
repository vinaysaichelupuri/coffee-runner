import { create } from 'zustand';

export type GameStatus = 'idle' | 'playing' | 'game_over';

export interface GameState {
  score: number;
  highScore: number;
  speed: number;
  activeLane: number;
  status: GameStatus;
  
  setScore: (score: number) => void;
  setHighScore: (highScore: number) => void;
  setSpeed: (speed: number) => void;
  setActiveLane: (lane: number) => void;
  setStatus: (status: GameStatus) => void;
  resetGame: () => void;
}

const initialState = {
  score: 0,
  highScore: 0,
  speed: 1,
  activeLane: 1,
  status: 'idle' as GameStatus,
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
  resetGame: () => set((state) => ({ ...initialState, highScore: state.highScore })), // High score should persist across resets
}));
