import { act, renderHook } from '@testing-library/react-native';
import { useGameStore } from '../useGameStore';
import { LANES } from '../../constants/gameConstants';
import { Obstacle } from '../../types/game';

describe('useGameStore Obstacles', () => {
  beforeEach(() => {
    act(() => {
      useGameStore.getState().resetGame();
      if (useGameStore.getState().clearObstacles) {
        useGameStore.getState().clearObstacles();
      }
    });
  });

  it('should initialize with an empty obstacles array', () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.obstacles).toEqual([]);
  });

  it('should add an obstacle', () => {
    const { result } = renderHook(() => useGameStore());
    const obstacle: Obstacle = { id: '1', lane: LANES.CENTER, type: 'barrier', active: true };
    
    act(() => {
      result.current.addObstacle(obstacle);
    });

    expect(result.current.obstacles).toHaveLength(1);
    expect(result.current.obstacles[0]).toEqual(obstacle);
  });

  it('should remove an obstacle by id', () => {
    const { result } = renderHook(() => useGameStore());
    const obstacle: Obstacle = { id: '1', lane: LANES.CENTER, type: 'barrier', active: true };
    
    act(() => {
      result.current.addObstacle(obstacle);
      result.current.removeObstacle('1');
    });

    expect(result.current.obstacles).toHaveLength(0);
  });

  it('should clear all obstacles', () => {
    const { result } = renderHook(() => useGameStore());
    const obstacle1: Obstacle = { id: '1', lane: LANES.CENTER, type: 'barrier', active: true };
    const obstacle2: Obstacle = { id: '2', lane: LANES.LEFT, type: 'cone', active: true };
    
    act(() => {
      result.current.addObstacle(obstacle1);
      result.current.addObstacle(obstacle2);
      result.current.clearObstacles();
    });

    expect(result.current.obstacles).toHaveLength(0);
  });
});
