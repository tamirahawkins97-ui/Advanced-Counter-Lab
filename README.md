# Advanced-Counter-Lab
## Modernized Retro Arcade Counter App

A feature-rich React and TypeScript counter application built with Vite and Tailwind CSS. This project demonstrates state management, side-effect synchronization, custom event handlers, local storage persistence, and a modernized nostalgic gaming CSS theme.

---

### Features

- **Single-State Synchronization:** Optimized increment and decrement handlers to prevent unnecessary re-renders or double state updates.
- **Dynamic Step Size:** Configurable step increment value allowing users to count by custom intervals.
- **History Tracker:** Real-time event log tracking count changes with clear history controls.
- **Local Storage Persistence:** Remembers current counter state and history log across page refreshes.
- **Keyboard Navigation:** Native accessibility and controls via global event listeners (`ArrowUp` to increment, `ArrowDown` to decrement).
- **Retro Arcade UI:** Custom modern CRT/Arcade theme with CSS variables, pseudo-element accents (`::before`, `::after`), and neon hover states.

---

### Tech Stack

- **Framework:** React (v18+)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Custom CSS (`App.css`)
- **Build Tool:** Vite

---

### Project Architecture

```text
src/
├── components/
│   └── HistoryTracker.tsx    # Sub-component rendering log of state changes
├── utils/
│   └── LocalStorage.ts       # Persistence helpers and cleanup utilities
├── App.tsx                   # Top-level application layout
├── CounterApp.tsx            # Counter core logic and keyboard listeners
├── App.css                   # Custom arcade theme and pseudo-element styles
└── main.tsx                  # Application entry point
