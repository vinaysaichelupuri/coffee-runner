import { useGameStore } from '../useGameStore';

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
    useGameStore.getState().setHighScore(0); // Manually reset high score for test isolation
  });

  it('initializes with correct default state', () => {
    const state = useGameStore.getState();
    expect(state.score).toBe(0);
    expect(state.highScore).toBe(0);
    expect(state.speed).toBe(1);
    expect(state.activeLane).toBe(1);
    expect(state.status).toBe('idle');
  });

  it('updates score correctly', () => {
    useGameStore.getState().setScore(100);
    expect(useGameStore.getState().score).toBe(100);
  });

  it('prevents negative score', () => {
    useGameStore.getState().setScore(-10);
    expect(useGameStore.getState().score).toBe(0);
  });

  it('updates high score', () => {
    useGameStore.getState().setHighScore(500);
    expect(useGameStore.getState().highScore).toBe(500);
  });

  it('updates speed', () => {
    useGameStore.getState().setSpeed(1.5);
    expect(useGameStore.getState().speed).toBe(1.5);
  });

  it('updates active lane within bounds', () => {
    useGameStore.getState().setActiveLane(0);
    expect(useGameStore.getState().activeLane).toBe(0);
    useGameStore.getState().setActiveLane(2);
    expect(useGameStore.getState().activeLane).toBe(2);
  });

  it('prevents out of bounds lane update', () => {
    const initialState = useGameStore.getState().activeLane;
    useGameStore.getState().setActiveLane(-1);
    expect(useGameStore.getState().activeLane).toBe(initialState);
    useGameStore.getState().setActiveLane(3);
    expect(useGameStore.getState().activeLane).toBe(initialState);
  });

  it('updates status', () => {
    useGameStore.getState().setStatus('playing');
    expect(useGameStore.getState().status).toBe('playing');
  });

  it('resets game but keeps high score', () => {
    const store = useGameStore.getState();
    store.setScore(100);
    store.setHighScore(500);
    store.setSpeed(2);
    store.setActiveLane(2);
    store.setStatus('game_over');

    store.resetGame();

    const resetState = useGameStore.getState();
    expect(resetState.score).toBe(0);
    expect(resetState.speed).toBe(1);
    expect(resetState.activeLane).toBe(1);
    expect(resetState.status).toBe('idle');
    expect(resetState.highScore).toBe(500); // High score should persist
  });
});
