import { act, renderHook } from '@testing-library/react-native';
import { useGameStore } from '../useGameStore';
import { LANES } from '../../constants/gameConstants';
import { Obstacle, Coffee } from '../../types/game';

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
    const obstacle: Obstacle = {
      id: '1', lane: LANES.CENTER, type: 'barrier', active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addObstacle(obstacle);
    });

    expect(result.current.obstacles).toHaveLength(1);
    expect(result.current.obstacles[0]).toEqual(obstacle);
  });

  it('should remove an obstacle by id', () => {
    const { result } = renderHook(() => useGameStore());
    const obstacle: Obstacle = {
      id: '1', lane: LANES.CENTER, type: 'barrier', active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addObstacle(obstacle);
      result.current.removeObstacle('1');
    });

    expect(result.current.obstacles).toHaveLength(0);
  });

  it('should clear all obstacles', () => {
    const { result } = renderHook(() => useGameStore());
    const obstacle1: Obstacle = {
      id: '1', lane: LANES.CENTER, type: 'barrier', active: true,
      spawnDistance: 0
    };
    const obstacle2: Obstacle = {
      id: '2', lane: LANES.LEFT, type: 'cone', active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addObstacle(obstacle1);
      result.current.addObstacle(obstacle2);
      result.current.clearObstacles();
    });

    expect(result.current.obstacles).toHaveLength(0);
  });
});

describe('useGameStore Coffees', () => {
  beforeEach(() => {
    act(() => {
      useGameStore.getState().resetGame();
      if (useGameStore.getState().clearCoffees) {
        useGameStore.getState().clearCoffees();
      }
    });
  });

  it('should initialize with an empty coffees array', () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.coffees).toEqual([]);
  });

  it('should add a coffee', () => {
    const { result } = renderHook(() => useGameStore());
    const coffee: Coffee = {
      id: 'c1', lane: LANES.CENTER, active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addCoffee(coffee);
    });

    expect(result.current.coffees).toHaveLength(1);
    expect(result.current.coffees[0]).toEqual(coffee);
  });

  it('should remove a coffee by id', () => {
    const { result } = renderHook(() => useGameStore());
    const coffee: Coffee = {
      id: 'c1', lane: LANES.CENTER, active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addCoffee(coffee);
      result.current.removeCoffee('c1');
    });

    expect(result.current.coffees).toHaveLength(0);
  });

  it('should clear all coffees', () => {
    const { result } = renderHook(() => useGameStore());
    const coffee1: Coffee = {
      id: 'c1', lane: LANES.CENTER, active: true,
      spawnDistance: 0
    };
    const coffee2: Coffee = {
      id: 'c2', lane: LANES.LEFT, active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addCoffee(coffee1);
      result.current.addCoffee(coffee2);
      result.current.clearCoffees();
    });

    expect(result.current.coffees).toHaveLength(0);
  });

  it('should increment score and remove coffee on collectCoffee', () => {
    const { result } = renderHook(() => useGameStore());
    const coffee: Coffee = {
      id: 'c1', lane: LANES.CENTER, active: true,
      spawnDistance: 0
    };
    
    act(() => {
      result.current.addCoffee(coffee);
    });

    expect(result.current.score).toBe(0);
    expect(result.current.coffees).toHaveLength(1);

    act(() => {
      result.current.collectCoffee('c1');
    });

    expect(result.current.score).toBe(10);
    expect(result.current.coffees).toHaveLength(0);
  });
});
