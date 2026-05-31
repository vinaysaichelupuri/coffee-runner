# Collision System Contract

This defines the interface for our collision utilities.

```typescript
export interface BoundingBox {
  lane: number;
  y: number;
  height: number;
}

/**
 * Checks if two bounding boxes intersect.
 * Accounts for fractional lane values during player transitions.
 */
export const isColliding = (box1: BoundingBox, box2: BoundingBox): boolean => {
  // Check for horizontal/lane overlap (threshold of 0.5 means they touch)
  const isLaneOverlapping = Math.abs(box1.lane - box2.lane) < 0.5;
  if (!isLaneOverlapping) return false;
  
  const box1Top = box1.y;
  const box1Bottom = box1.y + box1.height;
  const box2Top = box2.y;
  const box2Bottom = box2.y + box2.height;

  // Check for vertical overlap
  return box1Top < box2Bottom && box1Bottom > box2Top;
};
```
