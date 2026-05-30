import { act, renderHook } from '@testing-library/react-native';
import { useObstacleSpawner } from '../useObstacleSpawner';
import { useGameStore } from '../../store/useGameStore';
import { OBSTACLE_SPAWN_INTERVAL } from '../../constants/gameConstants';

jest.useFakeTimers();

describe('useObstacleSpawner', () => {
  beforeEach(() => {
    act(() => {
      useGameStore.setState({ status: 'playing', obstacles: [] });
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should not spawn obstacles when game is not playing', () => {
    act(() => {
      useGameStore.setState({ status: 'idle' });
    });

    renderHook(() => useObstacleSpawner());

    act(() => {
      jest.advanceTimersByTime(OBSTACLE_SPAWN_INTERVAL + 100);
    });

    expect(useGameStore.getState().obstacles).toHaveLength(0);
  });

  it('should spawn obstacles periodically when playing', () => {
    renderHook(() => useObstacleSpawner());

    act(() => {
      jest.advanceTimersByTime(OBSTACLE_SPAWN_INTERVAL);
    });

    expect(useGameStore.getState().obstacles?.length).toBeGreaterThan(0);
  });
});
