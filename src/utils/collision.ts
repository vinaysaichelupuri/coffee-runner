export interface BoundingBox {
  lane: number;
  y: number;
  height: number;
}

/**
 * Checks if two bounding boxes intersect.
 * Accounts for fractional lane values during player transitions.
 * @param box1 First bounding box (e.g. player)
 * @param box2 Second bounding box (e.g. obstacle)
 * @param laneThreshold Maximum lane difference to consider them overlapping horizontally
 * @returns boolean true if colliding
 */
export const isColliding = (box1: BoundingBox, box2: BoundingBox, laneThreshold: number = 0.5): boolean => {
  'worklet';
  // Check for horizontal/lane overlap
  const isLaneOverlapping = Math.abs(box1.lane - box2.lane) < laneThreshold;
  if (!isLaneOverlapping) return false;
  
  const box1Top = box1.y;
  const box1Bottom = box1.y + box1.height;
  const box2Top = box2.y;
  const box2Bottom = box2.y + box2.height;

  // Check for vertical overlap
  return box1Top < box2Bottom && box1Bottom > box2Top;
};
