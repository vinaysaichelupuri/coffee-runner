import { makeMutable } from 'react-native-reanimated';

// A globally accessible shared value to track player's exact fractional lane for collision.
// This allows true mid-transition collision detection on the UI thread without context or props.
export const playerFractionalLane = makeMutable(0);
