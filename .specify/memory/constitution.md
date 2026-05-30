# Coffee Runner Constitution

## Core Principles

### I. Gameplay First

The primary goal of Coffee Runner is to deliver a smooth, responsive, and enjoyable endless runner experience. All implementation decisions should prioritize gameplay quality, responsiveness, and player experience over unnecessary technical complexity.

### II. React Native Native-First Architecture

The game MUST be built using React Native without a dedicated game engine. Core functionality should leverage:

* React Native
* React Native Reanimated
* React Native Gesture Handler
* Zustand
* AsyncStorage

Additional dependencies should only be introduced when they provide clear value.

### III. Separation of Concerns

Game logic, rendering, and state management MUST remain separated.

Examples:

* Collision detection should not live inside UI components.
* Score calculations should be handled by utility functions or stores.
* UI components should focus on presentation.

This ensures maintainability and easier future enhancements.

### IV. Reusable & Type-Safe Components

All code MUST use TypeScript.

Game entities such as:

* Player
* Obstacle
* Coffee Cup
* Lane
* Scoreboard

should be implemented as reusable components with clearly defined interfaces.

Avoid duplicated logic whenever possible.

### V. Incremental Development

Features MUST be implemented in small, testable phases.

Development order:

1. Project Setup
2. Player Movement
3. Obstacle System
4. Coffee Collection
5. Game Loop
6. UI Screens
7. High Score Persistence
8. Polish & Optimization

Each phase should be functional before moving to the next.

---

## Technical Standards

### State Management

Use Zustand as the primary state management solution.

### Animations

Use React Native Reanimated for:

* Lane switching
* Object movement
* UI transitions

Avoid unnecessary React state updates inside animation-heavy code.

### Gestures

Use React Native Gesture Handler for swipe detection.

### Persistence

Use AsyncStorage for:

* High score storage
* Future local game settings

### Performance

The application should target:

* 60 FPS where possible
* Minimal unnecessary re-renders
* Proper cleanup of timers, intervals, and animation frames

---

## Testing Standards

### Required Testing

The following systems must have tests:

* Collision Detection
* Score Calculation
* Lane Switching Logic
* Game Over Logic

### Manual Testing Checklist

Before merging features:

* Player can switch lanes correctly
* Obstacles collide correctly
* Coffee cups increase score
* Speed increases over time
* Restart works correctly
* High score persists after app restart

---

## Folder Structure Standards

The project should follow:

src/
├── assets/
├── components/
├── screens/
├── hooks/
├── store/
├── utils/
├── constants/
└── types/

All new features should be added to the appropriate module.

---

## Governance

### Constitution Authority

This constitution serves as the source of truth for architecture and development decisions.

### Amendments

Changes to architecture, libraries, or development principles must be reflected in this constitution.

### Compliance

All generated plans, tasks, and specifications must align with this document before implementation begins.

Version: 1.1.0
Ratified: 2026-05-29
Last Amended: 2026-05-30
