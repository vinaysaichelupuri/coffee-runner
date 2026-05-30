import { useGameStore } from '../store/gameStore';

describe('useGameStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useGameStore.setState({
      score: 0,
      highScore: 0,
      speed: 1.0,
      activeLane: 1,
      status: 'idle',
    });
  });

  it('should initialize with correct default values', () => {
    const state = useGameStore.getState();
    expect(state.score).toBe(0);
    expect(state.highScore).toBe(0);
    expect(state.speed).toBe(1.0);
    expect(state.activeLane).toBe(1);
    expect(state.status).toBe('idle');
  });

  it('should increment score', () => {
    useGameStore.getState().incrementScore(10);
    expect(useGameStore.getState().score).toBe(10);
  });

  it('should set status', () => {
    useGameStore.getState().setStatus('playing');
    expect(useGameStore.getState().status).toBe('playing');
  });

  it('should reset game state', () => {
    useGameStore.getState().setStatus('gameover');
    useGameStore.getState().incrementScore(100);
    useGameStore.getState().resetGame();
    expect(useGameStore.getState().status).toBe('playing');
    expect(useGameStore.getState().score).toBe(0);
    expect(useGameStore.getState().activeLane).toBe(1);
  });
});
