# 3D Developer Portfolio - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
   - [App.jsx](#appjsx)
   - [Scene.jsx (3D)](#scenejsx-3d)
   - [Hero.jsx](#herojsx)
   - [About.jsx](#aboutjsx)
   - [Experience.jsx](#experiencejsx)
   - [Projects.jsx](#projectsjsx)
   - [Contact.jsx](#contactjsx)
   - [Navbar.jsx](#navbarjsx)
   - [Footer.jsx](#footerjsx)
   - [Loader.jsx](#loaderjsx)
5. [Styling System](#styling-system)
6. [Animation System](#animation-system)
7. [Performance Optimizations](#performance-optimizations)
8. [Customization Guide](#customization-guide)

---

## Project Overview

This is a premium 3D developer portfolio built with React, Vite, and Three.js (via @react-three/fiber). It features an immersive 3D hero section with interactive elements that respond to mouse movement, smooth scroll-based animations, and a modern glassmorphism UI design.

### Key Features

- **Interactive 3D Scene**: Central orb, orbital rings, floating shapes, and particles that react to cursor movement
- **Smooth Animations**: Framer Motion powered transitions and scroll-based animations
- **Premium Design**: Dark theme with purple/indigo accent colors and glassmorphism effects
- **Responsive Layout**: Fully responsive across all device sizes
- **Performance Optimized**: Lazy loading, Suspense boundaries, and optimized 3D rendering

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for component-based architecture |
| **Vite** | Fast build tool and development server |
| **Three.js** | 3D graphics library |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful helpers for react-three-fiber |
| **@react-three/postprocessing** | Post-processing effects (bloom, vignette, etc.) |
| **Framer Motion** | Animation library for React |
| **CSS3** | Styling with CSS variables and modern features |

---

## Project Structure

```
3D-website/
├── public/
│   └── favicon.svg              # Site favicon (S logo)
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── Scene.jsx        # Main 3D scene with all 3D elements
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Hero section with intro content
│   │   │   ├── About.jsx        # About section with skills
│   │   │   ├── Experience.jsx   # Work experience timeline
│   │   │   ├── Projects.jsx     # Project showcase grid
│   │   │   └── Contact.jsx      # Contact information
│   │   └── ui/
│   │       ├── Navbar.jsx       # Navigation bar
│   │       ├── Footer.jsx       # Footer component
│   │       └── Loader.jsx       # Loading screen
│   ├── styles/
│   │   └── index.css            # Global styles and CSS variables
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── DOCUMENTATION.md             # This file
```

---

## Core Components

### App.jsx

**Location**: `src/App.jsx`

**Purpose**: Main application component that orchestrates the entire portfolio.

#### Key Responsibilities

1. **Loading State Management**: Controls the loading screen display
2. **Canvas Setup**: Configures the 3D canvas with proper settings
3. **Layout Structure**: Arranges all sections in proper order
4. **Lazy Loading**: Implements React.lazy for code splitting

#### Code Breakdown

```jsx
// Loading state - shows loader for 2.5 seconds
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 2500)
  return () => clearTimeout(timer)
}, [])
```

**Timer Duration**: 2500ms allows assets to preload before showing content.

```jsx
// Lazy loaded components for better performance
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
// ... other lazy imports
```

**Lazy Loading**: Each section is loaded on-demand, reducing initial bundle size.

#### Canvas Configuration

| Property | Value | Purpose |
|----------|-------|---------|
| `shadows` | `true` | Enables shadow rendering |
| `dpr` | `[1, 2]` | Device pixel ratio range |
| `camera.position` | `[0, 2, 16]` | Initial camera position |
| `camera.fov` | `55` | Field of view in degrees |
| `gl.antialias` | `true` | Smooth edges |
| `gl.alpha` | `false` | Opaque background |
| `gl.powerPreference` | `high-performance` | GPU optimization |

---

### Scene.jsx (3D)

**Location**: `src/components/3d/Scene.jsx`

**Purpose**: Contains all 3D elements and their interactive behaviors.

#### Sub-Components

##### 1. ReactiveOrb

**Purpose**: Central glowing orb that serves as the focal point of the 3D scene.

```jsx
function ReactiveOrb({ mouse }) {
  // Refs for animation
  const meshRef = useRef()
  const glowRef = useRef()
  const wireRef = useRef()
  
  useFrame((state) => {
    // Rotation based on mouse position
    meshRef.current.rotation.x = lerp(..., mouse.current.y * 0.5 + t * 0.1, 0.05)
    meshRef.current.rotation.y = lerp(..., mouse.current.x * 0.5 + t * 0.15, 0.05)
    
    // Scale pulse based on mouse distance from center
    const mouseDistance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2)
    const targetScale = 1 + mouseDistance * 0.1 + Math.sin(t * 0.5) * 0.05
  })
}
```

**Visual Elements**:
- **Core Mesh**: Icosahedron with `MeshDistortMaterial` for organic movement
- **Inner Glow**: BackSide sphere with transparency
- **Outer Glow**: Larger BackSide sphere for ambient glow
- **Wireframe**: Low-poly wireframe overlay for tech aesthetic

**Material Properties**:
| Property | Value | Effect |
|----------|-------|--------|
| `color` | `#6366f1` | Primary indigo color |
| `distort` | `0.2` | Organic shape distortion |
| `metalness` | `1` | Full metallic appearance |
| `emissive` | `#4338ca` | Self-illumination color |
| `emissiveIntensity` | `0.8` | Glow strength |

##### 2. ReactiveRings

**Purpose**: Three orbital rings that tilt and rotate based on mouse position.

```jsx
function ReactiveRings({ mouse }) {
  useFrame((state) => {
    // Ring 1 - responds to vertical mouse movement
    ring1Ref.current.rotation.x = Math.PI / 3 + my * 0.4 + Math.sin(t * 0.1) * 0.1
    ring1Ref.current.rotation.y = mx * 0.4
    ring1Ref.current.rotation.z = t * 0.12  // Continuous rotation
  })
}
```

**Ring Specifications**:
| Ring | Radius | Thickness | Color | Opacity |
|------|--------|-----------|-------|---------|
| Ring 1 | 4.5 | 0.04 | `#a78bfa` | 1.0 |
| Ring 2 | 5.5 | 0.025 | `#c4b5fd` | 0.85 |
| Ring 3 | 7.0 | 0.018 | `#e0e7ff` | 0.5 |

##### 3. OrbitalSpheres

**Purpose**: Four spheres that orbit the central orb, each with a glowing trail.

```jsx
function OrbitalSpheres({ mouse }) {
  // Sphere 1-3: Orbit around center
  const angle1 = t * 0.4 + mx * 0.5  // Speed + mouse influence
  sphere1Ref.current.position.x = Math.cos(angle1) * 7
  sphere1Ref.current.position.z = Math.sin(angle1) * 7
  
  // Sphere 4: Directly follows mouse cursor
  sphere4Ref.current.position.x = lerp(..., mx * 6, 0.02)
  sphere4Ref.current.position.y = lerp(..., my * 4 + 3, 0.02)
}
```

**Trail Component** (from @react-three/drei):
```jsx
<Trail width={2} length={8} color="#8b5cf6" attenuation={(t) => t * t}>
  <mesh ref={sphere1Ref}>...</mesh>
</Trail>
```

##### 4. FloatingShapes

**Purpose**: Six geometric shapes floating around the scene.

**Shape Types**:
- Octahedron
- Icosahedron
- Tetrahedron
- Dodecahedron
- Box
- Cone

```jsx
const shapeConfigs = [
  { type: 'octahedron', size: 0.9, basePos: [-7, 4, -5], color: '#818cf8', speed: 0.3 },
  // ... other shapes
]

useFrame(() => {
  // Position reacts to mouse
  shape.position.x = config.basePos[0] + mx * (i % 2 === 0 ? 1.5 : -1.5)
  shape.position.y = config.basePos[1] + my * 1.5 + Math.sin(t * config.speed + i) * 0.8
  
  // Rotation follows mouse
  shape.rotation.x = my * 0.5 + t * (config.speed * 0.5)
  shape.rotation.y = mx * 0.5 + t * (config.speed * 0.6)
})
```

##### 5. ReactiveParticles

**Purpose**: 100 floating particles that respond to mouse movement.

```jsx
function ReactiveParticles({ mouse, count = 80 }) {
  // Generate particles in spherical distribution
  const particles = useMemo(() => {
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      // Convert to Cartesian coordinates
      temp.push({
        basePosition: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        speed: 0.15 + Math.random() * 0.25,
        mouseInfluence: 0.5 + Math.random() * 1.5
      })
    }
  }, [count])
}
```

**Particle Material**:
```jsx
<pointsMaterial
  size={0.12}
  color="#a78bfa"
  transparent
  opacity={0.75}
  blending={THREE.AdditiveBlending}  // Glowing effect
/>
```

##### 6. CursorLight

**Purpose**: Point light that follows the mouse cursor for dynamic lighting.

```jsx
function CursorLight({ mouse }) {
  useFrame(() => {
    lightRef.current.position.x = lerp(..., mouse.current.x * 10, 0.08)
    lightRef.current.position.y = lerp(..., mouse.current.y * 8 + 5, 0.08)
  })
  
  return (
    <pointLight 
      intensity={1.5}
      color="#818cf8"
      distance={25}
      decay={2}
    />
  )
}
```

#### Camera System

The camera system provides smooth movement based on scroll and mouse position.

```jsx
useFrame((state, delta) => {
  // Scroll-based camera orbit
  const radius = 16 - scroll * 5      // Gets closer as you scroll
  const angle = scroll * Math.PI * 0.4 // Rotates around scene
  const height = 2 + scroll * 6        // Rises as you scroll
  
  // Mouse parallax effect
  const parallaxStrength = 4 * (1 - scroll * 0.3)
  const mouseX = mouse.current.x * parallaxStrength
  const mouseY = mouse.current.y * parallaxStrength * 0.6
  
  // Breathing motion for organic feel
  const breatheX = Math.sin(time * 0.15) * 0.4
  const breatheY = Math.cos(time * 0.12) * 0.3
  
  // Smooth interpolation
  camera.position.x = lerp(camera.position.x, baseX + mouseX + breatheX, delta * 2)
})
```

#### Lighting Setup

| Light Type | Position | Intensity | Color | Purpose |
|------------|----------|-----------|-------|---------|
| Ambient | - | 0.12 | `#e0e7ff` | Base illumination |
| Directional (Key) | [10,15,8] | 1.8 | `#c7d2fe` | Main shadow-casting light |
| Directional (Fill) | [-8,8,-8] | 0.7 | `#a5b4fc` | Soften shadows |
| Directional (Rim) | [0,-8,12] | 0.5 | `#c4b5fd` | Edge highlighting |
| Point (Center) | [0,0,0] | 2.5 | `#6366f1` | Orb illumination |
| Point (Accent) | [8,5,8] | 1.0 | `#8b5cf6` | Scene accent |
| Spot | [0,18,0] | 1.2 | `#818cf8` | Dramatic top light |
| Cursor Light | Dynamic | 1.5 | `#818cf8` | Interactive lighting |

#### Post-Processing Effects

```jsx
<EffectComposer multisampling={4}>
  <Bloom
    luminanceThreshold={0.1}   // What brightness triggers bloom
    luminanceSmoothing={0.95}  // Bloom edge softness
    intensity={1.4}            // Bloom strength
    radius={0.9}               // Bloom spread
    mipmapBlur                 // Performance optimization
  />
  <ChromaticAberration
    offset={[0.0004, 0.0004]}  // RGB split amount
  />
  <Noise opacity={0.012} />    // Film grain effect
  <Vignette darkness={0.55} /> // Dark edges
</EffectComposer>
```

---

### Hero.jsx

**Location**: `src/components/sections/Hero.jsx`

**Purpose**: Main landing section with introduction and call-to-action.

#### Animation Configuration

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.8,      // Wait for loader
      staggerChildren: 0.12    // Cascade effect
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,                     // Start below
    filter: 'blur(10px)'       // Start blurred
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1]  // Custom easing
    }
  }
}
```

#### Content Structure

```jsx
<section className="hero">
  <motion.div className="hero-gradient" />     {/* Background gradient */}
  
  <motion.div className="hero-content">
    <p className="hero-greeting">Hello, I'm</p>
    <h1 className="hero-name">Suraj Raj</h1>
    <h2 className="hero-title">Fullstack Developer | MEAN Stack</h2>
    <p className="hero-description">...</p>
    
    <div className="hero-buttons">
      <a href="#projects" className="btn-primary">View Projects</a>
      <a href="#contact" className="btn-secondary">Get in Touch</a>
    </div>
  </motion.div>
  
  <div className="hero-3d-hint">              {/* Interaction hint */}
    <div className="cursor-icon">...</div>
    <span>Move cursor to interact</span>
  </div>
  
  <div className="scroll-hint">               {/* Scroll indicator */}
    <span>Scroll</span>
    <div className="scroll-line"></div>
  </div>
</section>
```

---

### About.jsx

**Location**: `src/components/sections/About.jsx`

**Purpose**: Personal bio and skills showcase.

#### Skills Data Structure

```jsx
const skills = [
  { name: 'Angular', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: '.NET', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'Deep Learning', category: 'AI/ML' },
]
```

#### Animation with useInView

```jsx
const ref = useRef(null)
const isInView = useInView(ref, { 
  once: true,           // Only animate once
  margin: '-100px'      // Trigger 100px before entering viewport
})
```

---

### Experience.jsx

**Location**: `src/components/sections/Experience.jsx`

**Purpose**: Work experience timeline.

#### Experience Data

```jsx
const experiences = [
  {
    company: 'Aurionpro Solutions',
    role: 'Software Developer',
    period: 'Oct 2025 - Present',
    description: 'Working on enterprise-level applications...',
    current: true
  },
  {
    company: 'Fintra Software',
    role: 'Junior Software Developer',
    period: 'Oct 2024 - Sep 2025',
    description: 'Developed and maintained full-stack applications...',
    current: false
  }
]
```

#### Timeline Card Component

```jsx
function ExperienceCard({ experience, index }) {
  return (
    <motion.div 
      className={`experience-card ${experience.current ? 'current' : ''}`}
      variants={cardVariants}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="experience-header">
        <span className="experience-company">{experience.company}</span>
        {experience.current && <span className="experience-note">Current</span>}
      </div>
      <span className="experience-period">{experience.period}</span>
      <h3 className="experience-role">{experience.role}</h3>
      <p className="experience-description">{experience.description}</p>
    </motion.div>
  )
}
```

---

### Projects.jsx

**Location**: `src/components/sections/Projects.jsx`

**Purpose**: Project portfolio showcase with 3D tilt hover effect.

#### Project Data Structure

```jsx
const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio...',
    tags: ['Angular', 'TypeScript', 'SCSS'],
    year: '2025',
    link: null
  },
  {
    title: 'Demo Company Website',
    description: 'Full-stack company website...',
    tags: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
    year: '2024',
    link: 'https://github.com/AdarshRaj241408/Demo_Company_Website_MEAN'
  },
  // ... more projects
]
```

#### 3D Tilt Effect

```jsx
const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate rotation based on mouse position
  const rotateX = (y - centerY) / 10  // Tilt up/down
  const rotateY = (centerX - x) / 10  // Tilt left/right
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}
```

---

### Contact.jsx

**Location**: `src/components/sections/Contact.jsx`

**Purpose**: Contact information and social links.

#### Contact Data

```jsx
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/...' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/...' },
  { name: 'Twitter', url: 'https://x.com/...' },
  { name: 'Resume', url: 'https://drive.google.com/...' }
]

const contactInfo = {
  email: 'rajsuraj663@gmail.com',
  phone: '+91 822-904-2309'
}
```

---

### Navbar.jsx

**Location**: `src/components/ui/Navbar.jsx`

**Purpose**: Fixed navigation bar with glassmorphism effect.

#### Scroll Detection

```jsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50)  // Add class after 50px scroll
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

#### Navigation Links

```jsx
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]
```

---

### Footer.jsx

**Location**: `src/components/ui/Footer.jsx`

**Purpose**: Site footer with copyright and social links.

---

### Loader.jsx

**Location**: `src/components/ui/Loader.jsx`

**Purpose**: Animated loading screen shown during initial load.

#### Animation Sequence

```jsx
// Container fades in
const containerVariants = {
  initial: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

// Name animates with scale and blur
const nameVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
}

// Progress bar fills over time
const barVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: { duration: 2, ease: 'easeInOut' }
  }
}
```

---

## Styling System

### CSS Variables

**Location**: `src/styles/index.css`

#### Color Palette

```css
:root {
  /* Primary Colors */
  --primary: #6366f1;          /* Main brand color */
  --primary-light: #818cf8;    /* Lighter shade */
  --primary-lighter: #a5b4fc;  /* Even lighter */
  --primary-dark: #4f46e5;     /* Darker shade */
  
  /* Accent Colors */
  --accent: #8b5cf6;           /* Secondary brand */
  --accent-light: #a78bfa;
  --accent-lighter: #c4b5fd;
  
  /* Background Colors */
  --bg-dark: #030305;          /* Main background */
  --bg-secondary: #08080c;     /* Section backgrounds */
  --bg-tertiary: #0f0f14;      /* Card backgrounds */
  --bg-card: rgba(15, 15, 20, 0.85);
  
  /* Text Colors */
  --text-primary: #fafafa;     /* Main text */
  --text-secondary: rgba(250, 250, 250, 0.75);
  --text-muted: rgba(250, 250, 250, 0.45);
  
  /* Glass Effect */
  --glass-bg: rgba(3, 3, 5, 0.75);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-border-hover: rgba(255, 255, 255, 0.12);
}
```

#### Typography

```css
:root {
  --font-display: 'Space Grotesk', sans-serif;  /* Headings */
  --font-body: 'Inter', sans-serif;              /* Body text */
}
```

#### Easing Functions

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### Glassmorphism Effect

```css
.glass-element {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}
```

---

## Animation System

### Framer Motion Patterns

#### Stagger Children

```jsx
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1  // Each child animates 0.1s after previous
    }
  }
}
```

#### Scroll-Triggered Animations

```jsx
const isInView = useInView(ref, { 
  once: true,      // Only trigger once
  margin: '-100px' // Trigger before fully in view
})

<motion.div
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={variants}
/>
```

#### Hover Interactions

```jsx
<motion.button
  whileHover={{ 
    scale: 1.03,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }}
  whileTap={{ scale: 0.98 }}
>
```

### Lerp Function

Used throughout 3D animations for smooth interpolation:

```javascript
const lerp = (a, b, t) => a + (b - a) * t

// Usage: smoothly move from current to target
currentValue = lerp(currentValue, targetValue, 0.05)
```

---

## Performance Optimizations

### 1. Lazy Loading

```jsx
const Hero = lazy(() => import('./components/sections/Hero'))
```

### 2. useMemo for Expensive Calculations

```jsx
const particles = useMemo(() => {
  // Generate 100 particles only once
  const temp = []
  for (let i = 0; i < count; i++) { ... }
  return temp
}, [count])
```

### 3. Canvas Optimization

```jsx
<Canvas
  dpr={[1, 2]}                    // Limit pixel ratio
  gl={{
    powerPreference: 'high-performance',
    antialias: true,
    stencil: false,               // Disable unused features
    depth: true
  }}
>
```

### 4. Preloading Assets

```jsx
import { Preload } from '@react-three/drei'

<Suspense fallback={null}>
  <Scene />
  <Preload all />  {/* Preload all assets */}
</Suspense>
```

---

## Customization Guide

### Changing Colors

1. Open `src/styles/index.css`
2. Modify the CSS variables in `:root`
3. Update 3D colors in `Scene.jsx` to match

### Updating Personal Information

1. **Hero.jsx**: Name, title, description
2. **About.jsx**: Bio text and skills array
3. **Experience.jsx**: Work history
4. **Projects.jsx**: Project details
5. **Contact.jsx**: Email, phone, social links
6. **Navbar.jsx**: Logo text
7. **Footer.jsx**: Copyright text
8. **Loader.jsx**: Name display
9. **index.html**: Meta tags

### Adding New Projects

```jsx
// In Projects.jsx, add to the projects array:
{
  title: 'New Project',
  description: 'Project description...',
  tags: ['React', 'Node.js'],
  year: '2025',
  link: 'https://github.com/...'  // or null
}
```

### Modifying 3D Elements

- **Orb Size**: Change `args={[2, 4]}` in `icosahedronGeometry`
- **Ring Count**: Add/remove ring meshes in `ReactiveRings`
- **Particle Count**: Modify `count` prop in `ReactiveParticles`
- **Colors**: Update color values in material props

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: WebGL 2.0 support required for 3D features.

---

## License

MIT License - Free to use and modify.

---

*Documentation last updated: February 2025*
