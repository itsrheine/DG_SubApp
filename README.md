# DG_SubApp
practice wellness app for daily affirmations

---

## Tech Stack

**Front End**
- React Native
- Expo
- Expo Router
- TypeScript

**Back End / Database**
- AsyncStorage (on-device persistence)

**State & UI**
- React useState
- StyleSheet (React Native)

---

## Features

- Home screen displaying all saved affirmations
- Create screen with title and affirmation text inputs
- Affirmations saved to device storage and persist between sessions
- Delete affirmations from the home screen
- Detail screen to view a full affirmation
- Text-to-speech playback using the device's built-in voice
- Repeat control - play an affirmation 1x, 3x, 5x, or 10x in a row
- Central color theme defined in constants/theme.ts
   - Background: #0d0620
   - Primary: #a78bfa

---

## Screens
| Screen | File | Purpose |
|---|---|---|
| Home | app/(tabs)/index.tsx | Lists all affirmations |
| Create | app/create.tsx | Add a new affirmation |
| Detail | app/affirmation.tsx | View and play an affirmation |

---

## In Progress

- Scheduling daily reminds
- Edit existing affirmations
- Multiple affirmation tracks

---

## Known Issues & Improvements

This project is actively being developed.

Issues and feature requests:
https://github.com/itsrheine/DG_SubApp

---

## Get Started

1. Clone the repository

```bash
git clone https://github.com/itsrheine/DG_SubApp.git
```

2. Go into the project folder

```bash
cd DG_SubApp
```

3. Install dependencies

```bash
npm install
```

4. Start the app

```bash
npx expo start
```

5. Download **Expo Go** on your phone and scan the QR code to preview the app

---

### Screenshots

<p align="center">
  <img src="./assets/screenshots/main page.jpg" height="400" />
  <img src="./assets/screenshots/create page.jpg" height="400" />
</p>