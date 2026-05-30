# ☕️ Coffee Runner

Coffee Runner is a fast-paced, lane-based endless runner game built with React Native and Expo. Players control a runner dash along a three-lane track, dodging obstacles (bar gates) and collecting coffee cups to keep the caffeine rush going!

---

## 🎮 Core Gameplay Loop

1. **Automatic Dash**: The runner constantly runs forward automatically.
2. **Three-Lane Control**: Swipe Left and Swipe Right to move between the **left, center, and right lanes**.
3. **Coffee Collection**: Collect coffee cups to increase your score (+10 points each).
4. **Obstacle Avoidance**: Dodge bar gates spawned randomly across lanes. Colliding with one results in a **Game Over**.
5. **Caffeine Rush**: Game speed gradually increases over time, raising the challenge.
6. **Persistence**: Tracks and persists high scores locally so you can always try to beat your best run.

---

## 🛠️ Technology Stack & Decisions

To deliver a 60 FPS performance target and native-feeling animations on mobile devices, Coffee Runner is built on a modern, lightweight React Native stack without a heavy overhead game engine:

*   **Framework**: [Expo](https://expo.dev/) (v56) with React Native
*   **Language**: TypeScript
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (for fast, reactive global game state)
*   **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) (for smooth, GPU-accelerated UI transitions)
*   **Gesture Control**: [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) (for highly responsive swipe detection)
*   **Storage**: `@react-native-async-storage/async-storage` (for offline high-score persistence)

---

## 📦 Project Directory Structure

```text
src/
├── app/                       # Expo Router file-based screens
│   ├── _layout.tsx            # Global app layout & providers
│   ├── index.tsx              # Home Screen / Start Screen
│   ├── game.tsx               # Game Screen (lane system & game loop)
│   └── game-over.tsx          # Game Over Screen / Stats
├── components/                # Reusable game and UI components
│   ├── Player.tsx             # Animated runner character
│   ├── Obstacle.tsx           # Spawned bar gate obstacle
│   ├── CoffeeCup.tsx          # Collectible coffee cup
│   └── Background.tsx         # Parallax / scrolling background
├── store/                     # Global state management
│   └── gameStore.ts           # Zustand store for scores, speed, and state
├── hooks/                     # Custom hooks
│   └── useGameLoop.ts         # Main game loop tick & spawning logic
├── constants/                 # Shared configurations
│   └── gameConstants.ts       # Lanes, speeds, spawn intervals, etc.
└── utils/                     # Helper functions
    ├── collision.ts           # Box collision detection logic
    └── score.ts               # Score calculation helpers
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and the Expo Go app (or Android/iOS simulators) installed.

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run start
   ```

3. **Run on a Device or Simulator**
   * Press `i` to open in the iOS Simulator.
   * Press `a` to open in the Android Emulator.
   * Scan the QR code with your mobile device's camera or the Expo Go app.

---

## 📋 MVP Scope

| Included in MVP | Excluded (Future Enhancements) |
| :--- | :--- |
| ✅ Three-lane runner movement | ❌ Jumping & sliding mechanics |
| ✅ Smooth lane-switch animations | ❌ Character skins / cosmetic shop |
| ✅ Coffee cup collection (+10 pts) | ❌ In-game power-ups & shields |
| ✅ Bar-gate obstacles & collision | ❌ Global leaderboards |
| ✅ Game Over screen & restarts | ❌ Multiplayer mode |
| ✅ Local high score persistence | ❌ Daily rewards & challenges |
| ✅ Gradual speed scaling over time | ❌ Background music & complex SFX |

---

## 📈 Development Roadmap

The project is structured in 14 incremental phases to ensure modular development and testing:

*   **Phase 0**: Project Setup & Dependency Configuration
*   **Phase 1**: Game Screen & Lane System Render
*   **Phase 2**: Swipe Gesture & Player Lane Movement
*   **Phase 3**: Zustand Store Setup (Score, Speed, Lane, Status)
*   **Phase 4**: Obstacle Generation & Spawning System
*   **Phase 5**: Coffee Spawning & Collection System
*   **Phase 6**: Collision Detection Logic
*   **Phase 7**: Main Game Loop System
*   **Phase 8**: Speed Progression & Difficulty Scaling
*   **Phase 9**: UI Screen Navigation Flow (Home, Play, Game Over)
*   **Phase 10**: AsyncStorage Score Persistence
*   **Phase 11**: Scrolling Road & Background Animation
*   **Phase 12**: Sound Effects (SFX) Integration
*   **Phase 13**: Quality Assurance, Bug Fixes & Optimization

