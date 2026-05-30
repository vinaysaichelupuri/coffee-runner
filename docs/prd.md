### Core Gameplay

* A boy continuously runs forward automatically.
* There are **3 lanes** (left, center, right).
* Player can swipe:

  * Left → move left lane
  * Right → move right lane
* Obstacles (bar gates) appear ahead.
* If the player collides with an obstacle → **Game Over**.
* Coffee cups appear on lanes.
* Collecting coffee cups increases score.
* As time passes, game speed gradually increases.
* The objective is to survive as long as possible and collect the highest number of coffee cups.

This is actually a great beginner-to-intermediate React Native game because the mechanics are simple but still demonstrate game loops, collision detection, animations, scoring, difficulty scaling, and state management.

---

# Product Requirements Document (PRD)

## Project Name

**Coffee Runner**

---

## Project Overview

Coffee Runner is a mobile endless runner game developed using React Native.

The player controls a boy running continuously along a three-lane track. The objective is to avoid obstacles and collect coffee cups to achieve the highest score possible.

As gameplay progresses, the running speed gradually increases, making the game more challenging over time.

The game emphasizes simple mechanics, minimal graphics, smooth performance, and addictive gameplay.

---

## Problem Statement

Many mobile games are graphically complex and require significant development effort.

Coffee Runner aims to provide a lightweight endless runner experience that is easy to build, easy to understand, and enjoyable to play while demonstrating core game development concepts.

---

## Goals

### Primary Goals

* Create a functional endless runner game.
* Implement smooth lane switching.
* Implement obstacle avoidance.
* Implement coffee cup collection.
* Implement score tracking.
* Implement increasing game difficulty.

### Secondary Goals

* Attractive UI with minimal graphics.
* High score persistence.
* Sound effects.
* Mobile performance optimization.

---

# Target Audience

* Casual mobile gamers.
* Students learning React Native game development.
* Users who enjoy endless runner games.

---

# Game Flow

## Start Screen

Display:

* Game Title
* Play Button
* High Score
* Instructions

Example:

```
COFFEE RUNNER

Highest Score: 120

[ PLAY ]
```

---

## Gameplay

When game starts:

* Boy begins running automatically.
* Obstacles start spawning.
* Coffee cups start spawning.
* Score begins from 0.

Player actions:

* Swipe Left
* Swipe Right

---

## During Gameplay

### Obstacle Collision

If player touches obstacle:

```
GAME OVER
```

Game stops.

---

### Coffee Collection

If player touches coffee cup:

```
Score += 10
```

Coffee cup disappears.

---

### Speed Increase

Every few seconds:

```
Current Speed += Increment
```

Example:

| Time   | Speed |
| ------ | ----- |
| 0 sec  | 1x    |
| 30 sec | 1.2x  |
| 60 sec | 1.4x  |
| 90 sec | 1.6x  |

---

# Functional Requirements

## FR1: Player Movement

### Description

Player can switch between three lanes.

### Acceptance Criteria

* Swipe left moves player one lane left.
* Swipe right moves player one lane right.
* Cannot move beyond outer lanes.
* Movement animation is smooth.

---

## FR2: Automatic Running

### Description

Player continuously runs forward.

### Acceptance Criteria

* No user action required.
* Running animation plays continuously.

---

## FR3: Obstacle System

### Description

Bar gates spawn randomly.

### Acceptance Criteria

* Obstacles appear in any lane.
* Obstacles move toward player.
* Collision triggers Game Over.

---

## FR4: Coffee Cup Collection

### Description

Coffee cups spawn randomly.

### Acceptance Criteria

* Coffee cups appear in lanes.
* Collision increases score.
* Coffee cup disappears after collection.

---

## FR5: Score System

### Description

Track player score.

### Acceptance Criteria

* Score displayed on screen.
* Score updates instantly.
* Score persists until game over.

---

## FR6: Difficulty Scaling

### Description

Game becomes harder over time.

### Acceptance Criteria

* Obstacle movement speed increases.
* Spawn rate increases gradually.
* Game remains playable.

---

## FR7: Game Over Screen

### Description

Display final results.

### Acceptance Criteria

Show:

* Final Score
* High Score
* Restart Button

Example:

```
GAME OVER

Score: 240
Best: 500

[ PLAY AGAIN ]
```

---

## FR8: High Score Storage

### Description

Store best score locally.

### Acceptance Criteria

* High score saved.
* High score loads on app launch.

Implementation:

```
AsyncStorage
```

---

# Non Functional Requirements

## Performance

* Maintain 60 FPS where possible.
* Smooth animations.
* Fast loading time.

---

## Compatibility

* Android
* iOS

---

## Reliability

* No crashes during gameplay.
* Proper game state reset.

---

# Game Objects

## Player

Properties:

```
Position
Current Lane
Running State
```

---

## Obstacle

Properties:

```
Lane
Speed
Position
```

---

## Coffee Cup

Properties:

```
Lane
Position
Value
```

---

# Scoring System

| Action                    | Points |
| ------------------------- | ------ |
| Coffee Cup                | +10    |
| Survival Bonus (Optional) | +1/sec |

---

# Technical Architecture

## Frontend

React Native

---

## State Management

Simple:

```
React Context
or
Zustand
```

Recommended:

```
Zustand
```

---

## Animations

```
React Native Reanimated
```

---

## Gesture Handling

```
react-native-gesture-handler
```

---

## Storage

```
AsyncStorage
```

---

# Suggested Folder Structure

```text
src/
│
├── components/
│   ├── Player.tsx
│   ├── Obstacle.tsx
│   ├── CoffeeCup.tsx
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── GameScreen.tsx
│   └── GameOverScreen.tsx
│
├── store/
│   └── gameStore.ts
│
├── hooks/
│   └── useGameLoop.ts
│
├── constants/
│   └── gameConstants.ts
│
├── utils/
│   ├── collision.ts
│   └── score.ts
│
└── assets/
    ├── player.png
    ├── coffee.png
    └── obstacle.png
```

---

# Future Enhancements

### Version 2

* Jump mechanic
* Slide mechanic
* Multiple character skins
* Power-ups
* Daily rewards
* Leaderboard
* Sound effects
* Background music
* Different environments

---

# MVP Scope (What to Build First)

For the first version, only implement:

✅ 3 lanes
✅ Running player
✅ Lane switching
✅ Coffee collection
✅ Obstacle collision
✅ Score system
✅ Increasing speed
✅ Game over screen
✅ Restart game

Anything beyond this can be added later.

