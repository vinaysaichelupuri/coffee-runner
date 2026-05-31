import { BoundingBox, isColliding } from '../collision';

describe('Collision Detection', () => {
  it('should detect collision in the same lane with overlapping Y', () => {
    const box1: BoundingBox = { lane: 1, y: 100, height: 50 };
    const box2: BoundingBox = { lane: 1, y: 120, height: 50 };
    expect(isColliding(box1, box2)).toBe(true);
  });

  it('should not detect collision in different lanes despite overlapping Y', () => {
    const box1: BoundingBox = { lane: 1, y: 100, height: 50 };
    const box2: BoundingBox = { lane: 2, y: 120, height: 50 };
    expect(isColliding(box1, box2)).toBe(false);
  });

  it('should not detect collision in the same lane without overlapping Y', () => {
    const box1: BoundingBox = { lane: 1, y: 100, height: 50 };
    const box2: BoundingBox = { lane: 1, y: 200, height: 50 };
    expect(isColliding(box1, box2)).toBe(false);
  });

  it('should detect collision during mid-transition (fractional lane)', () => {
    // Player transitioning from lane 1 to 2, currently at 1.4
    const box1: BoundingBox = { lane: 1.4, y: 100, height: 50 };
    // Obstacle fully in lane 1
    const box2: BoundingBox = { lane: 1, y: 120, height: 50 };
    // Obstacle fully in lane 2
    const box3: BoundingBox = { lane: 2, y: 120, height: 50 };
    
    // Difference is 0.4 < 0.5, so overlapping with lane 1
    expect(isColliding(box1, box2)).toBe(true);
    // Difference is 0.6 >= 0.5, so not overlapping with lane 2 yet
    expect(isColliding(box1, box3)).toBe(false);
  });
});
