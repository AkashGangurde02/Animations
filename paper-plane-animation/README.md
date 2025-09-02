# Paper Plane Animation

A React-based interactive paper plane animation that follows the mouse cursor with a trailing effect.

## Features

- 🛩️ Paper plane follows mouse cursor with smooth movement
- ✨ Dynamic trail effect behind the plane
- 🎯 Maintains optimal distance from cursor
- 🔄 Smooth rotation based on movement direction
- 📱 Responsive design

## Technologies Used

- React 18
- Vite
- CSS3 Animations
- SVG Graphics

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## How it Works

The animation uses:
- **Mouse tracking** - Captures cursor position in real-time
- **Distance calculation** - Maintains optimal following distance
- **Smooth interpolation** - Creates fluid movement and rotation
- **Trail system** - Generates trailing effect with opacity fade

## Customization

You can adjust animation parameters in `App.jsx`:
- `FOLLOW_DISTANCE` - Distance the plane maintains from cursor
- `FOLLOW_SPEED` - How quickly the plane follows
- `ROTATION_SPEED` - Rotation smoothness
- `TRAIL_LENGTH` - Number of trail points
- `TRAIL_SPACING` - Distance between trail elements

## Demo

Move your mouse around the screen to see the paper plane follow with a beautiful trailing effect!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
