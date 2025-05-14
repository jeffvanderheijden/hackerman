
markdown
Kopiëren
Bewerken
# 🧠 CodeQuest: A Retro Adventure to Learn Programming

CodeQuest is a retro-style 2D side-scrolling game built in **React**. It's designed to teach **basic programming concepts** — like variables, if/else statements, and loops — through interactive storytelling, NPC dialogue, and a boss battle.

Perfect for **Software Developer** students, the game blends fun, narrative, and learning in a pixel-perfect terminal-themed experience.
Part of the introduction assignment for potential new students.

---

## 🎮 Features

- **👾 Classic Side-Scroller** with pixel art tiles, parallax backgrounds, and smooth camera scrolling.
- **🧍 NPC Interactions**: Three animated robots teach you:
  - `Byte` – Variables
  - `ConditionalBot` – If/Else Statements
  - `Looper` – Loops
- **💬 Dialogue HUD** styled like a hacker terminal, with:
  - Multiple-choice options
  - Input fields
  - Memory of previous choices
- **⚔️ Final Boss Battle**: Answer all 3 questions right to win. Get them wrong? Lose health.
- **💚 Health Bar** with dynamic color and animation (green → orange → red)
- **💀 Enemies (Bugs)**: Contact with them reduces health.
- **🌀 Respawn System** with fade-to-black and temporary invincibility.
- **🕹️ Control Tooltip**: Hover the top-right ❓ to see the keys.
- **🎨 Custom Sprite Sheets** for player, NPCs, bugs, and the boss.

---

## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/) (for animations)
- Custom hooks:  
  - `usePlayer()`  
  - `useDialogue()`  
  - `useGameLoop()`  
  - `useControls()`

---

## 🕹️ Controls

| Action      | Key              |
|-------------|------------------|
| Move Left   | `←` or `A`       |
| Move Right  | `→` or `D`       |
| Jump        | `↑` or `Space`   |
| Interact    | `E`              |
| Dialogue    | `1`, `2`, `3`    |

Hover the ❓ icon in-game to see these at any time.

---

## 🧠 Learning Goals

This game teaches through play:

- What is a variable?
- How do if/else statements work?
- What are loops and why do we use them?
- How to debug and make code decisions

---

## 🧪 Project Structure

src/
├── components/
│ ├── NPC.jsx
│ ├── NPC2.jsx
│ ├── NPC3.jsx
│ ├── Bug.jsx
│ ├── Boss.jsx
│ ├── Player.jsx
│ ├── HUD.jsx
│ ├── HelpTooltip.jsx
├── dialogue/
│ ├── greeting.js
│ ├── ifelse.js
│ ├── loops.js
│ └── boss.js
├── game/
│ ├── usePlayer.js
│ ├── useControls.js
│ ├── useGameLoop.js
│ ├── useDialogue.js
│ └── constants.js
└── SideScroller.jsx

yaml
Kopiëren
Bewerken

---

## 🚀 Running the Game

```bash
npm install
npm start
🧑‍🎓 Created For
MBO4 Creative Software Developers
By combining game design, interactivity, and code literacy, this project aims to make programming fun, approachable, and visual.

🛠️ Future Ideas
Save progress with localStorage

Add collectibles for correct answers

Add a second level with arrays and functions

Expand boss fight mechanics (e.g. timers, visual attacks)

📸 Screenshots
TODO: Add screenshots

📜 License
MIT — feel free to remix, adapt, and share for educational purposes.