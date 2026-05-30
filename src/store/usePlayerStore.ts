import { create } from 'zustand';
import { LANES, Lane } from '../constants/gameConstants';

export interface PlayerState {
  currentLane: Lane;
  isMoving: boolean;
  moveLeft: () => void;
  moveRight: () => void;
  setIsMoving: (isMoving: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentLane: LANES.CENTER,
  isMoving: false,
  setIsMoving: (isMoving) => set({ isMoving }),
  moveLeft: () => set((state) => ({ 
    currentLane: state.currentLane > LANES.LEFT ? (state.currentLane - 1) as Lane : state.currentLane
  })),
  moveRight: () => set((state) => ({ 
    currentLane: state.currentLane < LANES.RIGHT ? (state.currentLane + 1) as Lane : state.currentLane
  })),
}));
