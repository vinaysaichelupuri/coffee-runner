import { usePlayerStore } from '../../src/store/usePlayerStore';
import { LANES } from '../../src/constants/gameConstants';

describe('usePlayerStore basic lane switching', () => {
  beforeEach(() => {
    usePlayerStore.setState({ currentLane: LANES.CENTER });
  });

  it('moves left correctly', () => {
    usePlayerStore.getState().moveLeft();
    expect(usePlayerStore.getState().currentLane).toBe(LANES.LEFT);
  });

  it('moves right correctly', () => {
    usePlayerStore.getState().moveRight();
    expect(usePlayerStore.getState().currentLane).toBe(LANES.RIGHT);
  });

  it('prevents moving left beyond the leftmost lane', () => {
    usePlayerStore.setState({ currentLane: LANES.LEFT });
    usePlayerStore.getState().moveLeft();
    expect(usePlayerStore.getState().currentLane).toBe(LANES.LEFT);
  });

  it('prevents moving right beyond the rightmost lane', () => {
    usePlayerStore.setState({ currentLane: LANES.RIGHT });
    usePlayerStore.getState().moveRight();
    expect(usePlayerStore.getState().currentLane).toBe(LANES.RIGHT);
  });
});
