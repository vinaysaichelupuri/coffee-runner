# Phase 0: Research & Technical Decisions

## Navigation Implementation
**Decision:** We will use Expo Router to navigate between three distinct screens: `index` (Home), `game` (Gameplay), and `game-over` (Game Over). We will pass the score and high score via query parameters or access them from the Zustand store.
**Rationale:** Expo Router is already set up and used in the app, and provides a simple file-based routing mechanism.
**Alternatives considered:** Keeping everything on a single screen with conditional rendering. Conditional rendering would clutter `GameScreen.tsx` and make it harder to maintain distinct visual states.

## Background Animation Strategy
**Decision:** We will implement an animated background component using `react-native-reanimated`.
**Rationale:** Standard React Native animations (`Animated`) can cause stutter when the JS thread is busy. Reanimated runs entirely on the native UI thread, ensuring the 60fps performance required by the Constitution. We will use a repeating graphical tile (like a road texture or grid) and translate it continuously on the Y-axis using the shared `globalDistance` value from the game loop, which naturally ties the background speed to the game speed.
**Alternatives considered:** CSS animations (not applicable for native mobile), `requestAnimationFrame` on JS thread (too slow).

## Audio Implementation
**Decision:** We will use the `expo-av` package for audio playback. We will create a custom hook `useAudio` to manage sound preloading and playback.
**Rationale:** `expo-av` is the robust, standard library for Expo audio. Managing it in a custom hook ensures sounds are loaded into memory when the app starts, reducing playback latency when a fast-paced game event occurs.
**Alternatives considered:** Using the experimental `expo-audio` module (less mature documentation), native modules (violates Expo-managed workflow).
