# Suraj Raj - 3D Developer Portfolio

A premium cinematic 3D developer portfolio built with React, Vite, and @react-three/fiber. Features immersive 3D visuals, smooth animations, and modern design.

## Features

- **Fullscreen 3D Hero**: Abstract glowing orb with orbiting rings and floating particles
- **Post Processing Effects**: Bloom, chromatic aberration, film grain, and vignette
- **Mouse Parallax**: Camera follows cursor movement smoothly
- **Scroll Animations**: Content reveals with blur and slide effects
- **3D Tilt Cards**: Interactive project cards with perspective transforms
- **Glassmorphism UI**: Modern frosted glass navbar
- **Smooth Transitions**: Framer Motion animations throughout
- **Responsive Design**: Optimized for all screen sizes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers and abstractions
- **@react-three/postprocessing** - Post-processing effects
- **Framer Motion** - Animations

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   └── Scene.jsx        # 3D scene with effects
│   ├── sections/
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # About & skills
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Projects.jsx     # Projects grid
│   │   └── Contact.jsx      # Contact section
│   └── ui/
│       ├── Loader.jsx       # Loading screen
│       ├── Navbar.jsx       # Navigation
│       └── Footer.jsx       # Footer
├── styles/
│   └── index.css            # Global styles
├── App.jsx                  # Main app
└── main.jsx                 # Entry point
```

## Sections

1. **Hero** - Name, title, tagline with 3D background
2. **About** - Bio and skills grid
3. **Experience** - Work history timeline
4. **Projects** - Featured projects with tilt effect
5. **Contact** - Email, phone, social links

## Contact

- **Email**: rajsuraj663@gmail.com
- **LinkedIn**: linkedin.com/in/suraj663
- **GitHub**: github.com/suraj-9430

## License

MIT License - Developed by Suraj Raj
