import { renderHook, act } from '@testing-library/react-native';
import { useCoffeeSpawner } from '../useCoffeeSpawner';
import { useGameStore } from '../../store/useGameStore';

jest.useFakeTimers();

describe('useCoffeeSpawner', () => {
  beforeEach(() => {
    act(() => {
      useGameStore.getState().resetGame();
      if (useGameStore.getState().clearCoffees) {
        useGameStore.getState().clearCoffees();
      }
    });
    jest.clearAllTimers();
  });

  it('should not spawn coffees if game status is idle', () => {
    act(() => {
      useGameStore.getState().setStatus('idle');
    });

    renderHook(() => useCoffeeSpawner());

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(useGameStore.getState().coffees).toHaveLength(0);
  });

  it('should spawn coffees when game status is playing', () => {
    act(() => {
      useGameStore.getState().setStatus('playing');
    });

    renderHook(() => useCoffeeSpawner());

    act(() => {
      jest.advanceTimersByTime(3000); // COFFEE_SPAWN_INTERVAL
    });

    expect(useGameStore.getState().coffees).toHaveLength(1);
  });
});
