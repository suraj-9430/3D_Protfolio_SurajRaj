# Complete Beginner's Guide - Understanding Every Line of Code

This guide explains EVERYTHING in simple terms so you can understand exactly what each piece of code does.

---

# TABLE OF CONTENTS

1. [What is This Project?](#1-what-is-this-project)
2. [How the Project Starts](#2-how-the-project-starts)
3. [App.jsx - The Main Controller](#3-appjsx---the-main-controller)
4. [Scene.jsx - The 3D Magic](#4-scenejsx---the-3d-magic)
5. [Hero.jsx - The Welcome Section](#5-herojsx---the-welcome-section)
6. [About.jsx - About You Section](#6-aboutjsx---about-you-section)
7. [Experience.jsx - Work History](#7-experiencejsx---work-history)
8. [Projects.jsx - Your Work](#8-projectsjsx---your-work)
9. [Contact.jsx - How to Reach You](#9-contactjsx---how-to-reach-you)
10. [Navbar.jsx - Navigation Menu](#10-navbarjsx---navigation-menu)
11. [Footer.jsx - Bottom Section](#11-footerjsx---bottom-section)
12. [Loader.jsx - Loading Screen](#12-loaderjsx---loading-screen)
13. [index.css - All The Styles](#13-indexcss---all-the-styles)

---

# 1. What is This Project?

This is a **3D Portfolio Website** - a personal website to showcase your work, but with cool 3D graphics that respond to your mouse movement.

**What makes it special:**
- A floating 3D orb in the background
- Rings and shapes that move when you move your mouse
- Smooth animations when scrolling
- Modern dark design with purple/blue colors

---

# 2. How the Project Starts

When someone opens your website, here's what happens step by step:

```
1. Browser loads index.html
2. index.html loads main.jsx
3. main.jsx loads App.jsx
4. App.jsx shows Loader first
5. After 2.5 seconds, App.jsx shows the actual website
6. The 3D scene starts rendering in the background
7. All sections (Hero, About, Projects, etc.) appear
```

---

# 3. App.jsx - The Main Controller

**Location:** `src/App.jsx`

**What it does:** This is like the "manager" of your website. It controls what appears and when.

## Line by Line Explanation:

```jsx
import { Suspense, lazy, useState, useEffect } from 'react'
```
**What this means:**
- `Suspense` - Shows a loading state while things load
- `lazy` - Loads components only when needed (saves memory)
- `useState` - Lets us track if loading is done
- `useEffect` - Runs code when the page first loads

```jsx
import { Canvas } from '@react-three/fiber'
```
**What this means:** `Canvas` is a special container that allows 3D graphics to appear on the webpage.

```jsx
import { Preload } from '@react-three/drei'
```
**What this means:** `Preload` loads all 3D assets (textures, models) before showing them.

```jsx
const [isLoading, setIsLoading] = useState(true)
```
**What this means:**
- `isLoading` is a variable that is `true` at start
- When loading is done, we set it to `false`
- This controls whether we show the loader or the actual content

```jsx
useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 2500)
  return () => clearTimeout(timer)
}, [])
```
**What this means:**
- When page loads, start a timer for 2500 milliseconds (2.5 seconds)
- After 2.5 seconds, set `isLoading` to `false`
- This gives time for 3D assets to load
- `return () => clearTimeout(timer)` cleans up if user leaves early

```jsx
const Hero = lazy(() => import('./components/sections/Hero'))
```
**What this means:**
- Don't load Hero component immediately
- Only load it when we actually need to show it
- This makes the initial page load faster

```jsx
<Canvas
  shadows
  dpr={[1, 2]}
  camera={{ position: [0, 2, 16], fov: 55, near: 0.1, far: 100 }}
  gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
>
```
**What each property means:**
- `shadows` - Enable shadow effects
- `dpr={[1, 2]}` - Screen resolution (1x to 2x for sharp display)
- `camera` settings:
  - `position: [0, 2, 16]` - Camera is at x=0, y=2, z=16 (16 units away from center)
  - `fov: 55` - Field of view (how wide the camera sees)
  - `near: 0.1` - Objects closer than 0.1 units are invisible
  - `far: 100` - Objects farther than 100 units are invisible
- `gl` settings:
  - `antialias: true` - Smooth edges on 3D objects
  - `alpha: false` - No transparency (solid background)
  - `powerPreference: 'high-performance'` - Use best GPU performance

---

# 4. Scene.jsx - The 3D Magic

**Location:** `src/components/3d/Scene.jsx`

**What it does:** This creates ALL the 3D stuff you see - the orb, rings, particles, floating shapes.

## Imports Explained:

```jsx
import { useRef, useMemo, useEffect } from 'react'
```
- `useRef` - Creates a "reference" to grab 3D objects and manipulate them
- `useMemo` - Remembers calculations so we don't redo them every frame
- `useEffect` - Runs code when component first appears

```jsx
import { useFrame, useThree } from '@react-three/fiber'
```
- `useFrame` - Runs code 60 times per second (for smooth animation)
- `useThree` - Gives access to the camera, scene, and renderer

```jsx
import { Environment, Float, MeshDistortMaterial, Stars, Sparkles, Trail } from '@react-three/drei'
```
- `Environment` - Adds realistic lighting/reflections
- `Float` - Makes objects gently float up and down
- `MeshDistortMaterial` - Material that wobbles and distorts
- `Stars` - Adds starfield in background
- `Sparkles` - Adds glowing sparkle particles
- `Trail` - Adds glowing trail behind moving objects

```jsx
import * as THREE from 'three'
```
- Gives access to all Three.js features for 3D graphics

---

## The Lerp Function:

```jsx
const lerp = (a, b, t) => a + (b - a) * t
```

**What is lerp?** 
"Lerp" means "Linear Interpolation" - it smoothly moves from one value to another.

**Example:**
- If `a = 0` (current position)
- And `b = 100` (target position)
- And `t = 0.1` (10% of the way)
- Result: `0 + (100 - 0) * 0.1 = 10`

So each frame, it moves 10% closer to the target. This creates SMOOTH movement instead of jerky jumps.

---

## ReactiveOrb Component:

```jsx
function ReactiveOrb({ mouse }) {
```
**What this is:** The big glowing ball in the center of the screen.

```jsx
const meshRef = useRef()
const glowRef = useRef()
const wireRef = useRef()
```
**What these are:** References to grab the 3D objects so we can move/rotate them.

```jsx
useFrame((state) => {
  const t = state.clock.elapsedTime
```
**What this does:**
- `useFrame` runs this code 60 times per second
- `state.clock.elapsedTime` is how many seconds since page loaded
- We use `t` for animations based on time

```jsx
if (meshRef.current) {
  meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, mouse.current.y * 0.5 + t * 0.1, 0.05)
```
**What this does:**
- Check if the orb exists
- Smoothly rotate it on X-axis based on:
  - `mouse.current.y * 0.5` - Mouse vertical position (multiplied by 0.5 to reduce intensity)
  - `t * 0.1` - Slow constant rotation over time
  - `0.05` - Smoothness factor (5% movement per frame)

```jsx
const mouseDistance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2)
const targetScale = 1 + mouseDistance * 0.1 + Math.sin(t * 0.5) * 0.05
```
**What this does:**
- Calculate how far mouse is from center using Pythagorean theorem
- Make the orb bigger when mouse is far from center
- Add a subtle "breathing" effect with `Math.sin`

### The Orb's Visual Parts:

```jsx
<Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
  <mesh ref={meshRef} castShadow>
    <icosahedronGeometry args={[2, 4]} />
```
**What this is:**
- `Float` - Wraps the orb to make it gently bob up and down
- `mesh` - A 3D object
- `icosahedronGeometry` - A 20-sided shape (looks like a ball)
  - `args={[2, 4]}` means: radius=2, detail level=4

```jsx
<MeshDistortMaterial
  color="#6366f1"
  speed={2}
  distort={0.2}
  radius={1}
  metalness={1}
  roughness={0}
  emissive="#4338ca"
  emissiveIntensity={0.8}
/>
```
**What each property does:**
- `color="#6366f1"` - Main color (indigo/purple)
- `speed={2}` - How fast the distortion wobbles
- `distort={0.2}` - How much it wobbles (0.2 = 20%)
- `radius={1}` - Size of distortion waves
- `metalness={1}` - Fully metallic/shiny (1 = 100%)
- `roughness={0}` - Not rough at all (perfectly smooth mirror)
- `emissive="#4338ca"` - Glows this color
- `emissiveIntensity={0.8}` - How bright the glow is

```jsx
<mesh ref={glowRef}>
  <sphereGeometry args={[2.5, 32, 32]} />
  <meshBasicMaterial
    color="#818cf8"
    transparent
    opacity={0.12}
    side={THREE.BackSide}
  />
</mesh>
```
**What this is:** The inner glow around the orb
- `sphereGeometry args={[2.5, 32, 32]}` - Sphere with radius 2.5, 32x32 segments (smooth)
- `meshBasicMaterial` - Simple material that doesn't react to light
- `transparent` & `opacity={0.12}` - 88% see-through
- `side={THREE.BackSide}` - Only show the inside of the sphere (so it glows around the orb)

---

## ReactiveRings Component:

```jsx
function ReactiveRings({ mouse }) {
```
**What this is:** Three circular rings that orbit around the orb.

```jsx
if (ring1Ref.current) {
  ring1Ref.current.rotation.x = Math.PI / 3 + my * 0.4 + Math.sin(t * 0.1) * 0.1
  ring1Ref.current.rotation.y = mx * 0.4
  ring1Ref.current.rotation.z = t * 0.12
}
```
**What this does:**
- `Math.PI / 3` - Start tilted at 60 degrees
- `my * 0.4` - Tilt based on mouse Y position
- `Math.sin(t * 0.1) * 0.1` - Gentle wobble over time
- `rotation.z = t * 0.12` - Constant spinning

```jsx
<mesh ref={ring1Ref}>
  <torusGeometry args={[4.5, 0.04, 16, 200]} />
```
**What this is:**
- `torusGeometry` - A donut/ring shape
- `args={[4.5, 0.04, 16, 200]}`:
  - `4.5` - Radius of the ring
  - `0.04` - Thickness of the tube
  - `16` - Segments around the tube
  - `200` - Segments around the ring (smooth circle)

---

## OrbitalSpheres Component:

```jsx
function OrbitalSpheres({ mouse }) {
```
**What this is:** Four small spheres that orbit around, each leaving a glowing trail.

```jsx
const angle1 = t * 0.4 + mx * 0.5
sphere1Ref.current.position.x = Math.cos(angle1) * 7
sphere1Ref.current.position.z = Math.sin(angle1) * 7
sphere1Ref.current.position.y = Math.sin(t * 0.3 + my) * 2 + my * 2
```
**What this does:**
- `angle1 = t * 0.4 + mx * 0.5` - Angle changes over time + mouse influence
- `Math.cos(angle1) * 7` - X position follows a circle with radius 7
- `Math.sin(angle1) * 7` - Z position follows same circle
- Together, this makes the sphere orbit in a circle
- Y position bobs up and down based on time and mouse

```jsx
// Sphere 4 - follows mouse more directly
sphere4Ref.current.position.x = lerp(sphere4Ref.current.position.x, mx * 6, 0.02)
sphere4Ref.current.position.y = lerp(sphere4Ref.current.position.y, my * 4 + 3, 0.02)
```
**What this does:**
- This sphere directly follows your mouse cursor
- `lerp` with `0.02` makes it follow slowly/smoothly
- `mx * 6` - Target X is 6 times the mouse X position
- `my * 4 + 3` - Target Y is 4 times mouse Y, plus 3 to lift it up

```jsx
<Trail width={2} length={8} color="#8b5cf6" attenuation={(t) => t * t}>
  <mesh ref={sphere1Ref}>
```
**What this is:**
- `Trail` - Creates a glowing trail behind the sphere
- `width={2}` - Trail is 2 units wide
- `length={8}` - Trail extends 8 units behind
- `attenuation={(t) => t * t}` - Trail fades with a curve (squared)

---

## FloatingShapes Component:

```jsx
const shapeConfigs = useMemo(() => [
  { type: 'octahedron', size: 0.9, basePos: [-7, 4, -5], color: '#818cf8', speed: 0.3 },
  { type: 'icosahedron', size: 0.7, basePos: [8, -2, -6], color: '#a78bfa', speed: 0.25 },
  // ... more shapes
], [])
```
**What this is:** Configuration for 6 different floating geometric shapes.
- `useMemo` with `[]` means: calculate once, never recalculate
- Each shape has:
  - `type` - What shape it is
  - `size` - How big
  - `basePos` - Starting position [x, y, z]
  - `color` - What color
  - `speed` - How fast it animates

```jsx
{config.type === 'octahedron' && <octahedronGeometry args={[config.size]} />}
{config.type === 'icosahedron' && <icosahedronGeometry args={[config.size]} />}
```
**What this does:**
- If type is 'octahedron', create an octahedron (8-sided diamond shape)
- If type is 'icosahedron', create an icosahedron (20-sided)
- etc. for each shape type

---

## ReactiveParticles Component:

```jsx
function ReactiveParticles({ mouse, count = 80 }) {
```
**What this is:** 100 small glowing dots floating around the scene.

```jsx
const particles = useMemo(() => {
  const temp = []
  for (let i = 0; i < count; i++) {
    const radius = 6 + Math.random() * 14
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    temp.push({
      basePosition: new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ),
```
**What this does:**
- Create 100 particles at random positions
- Uses spherical coordinates (like latitude/longitude) to spread them in a sphere
- `radius = 6 + Math.random() * 14` - Distance from center (6 to 20)
- `theta` and `phi` are random angles
- The math converts spherical coordinates to x,y,z positions

```jsx
<points ref={particlesRef}>
  <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      count={count}
      array={positions}
      itemSize={3}
    />
  </bufferGeometry>
  <pointsMaterial
    size={0.12}
    color="#a78bfa"
    transparent
    opacity={0.75}
    blending={THREE.AdditiveBlending}
  />
</points>
```
**What this is:**
- `points` - Renders many points/dots efficiently
- `bufferGeometry` - Efficient way to store point positions
- `bufferAttribute` - The actual position data
  - `itemSize={3}` - Each point has 3 values (x, y, z)
- `pointsMaterial` - How the points look
  - `size={0.12}` - Size of each dot
  - `blending={THREE.AdditiveBlending}` - Makes overlapping points brighter (glow effect)

---

## CursorLight Component:

```jsx
function CursorLight({ mouse }) {
  const lightRef = useRef()

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = lerp(lightRef.current.position.x, mouse.current.x * 10, 0.08)
      lightRef.current.position.y = lerp(lightRef.current.position.y, mouse.current.y * 8 + 5, 0.08)
      lightRef.current.position.z = 8
    }
  })
```
**What this is:** A light that follows your mouse cursor.
- Position smoothly follows mouse (lerp with 0.08 = 8% per frame)
- X moves 10 units for full mouse movement
- Y moves 8 units, plus 5 to keep it above center
- Z stays at 8 (in front of the scene)

```jsx
return (
  <pointLight 
    ref={lightRef}
    position={[0, 5, 8]}
    intensity={1.5}
    color="#818cf8"
    distance={25}
    decay={2}
  />
)
```
**What this is:**
- `pointLight` - Light that shines in all directions from a point
- `intensity={1.5}` - Brightness
- `color="#818cf8"` - Light blue/purple color
- `distance={25}` - Light reaches 25 units away
- `decay={2}` - How quickly light fades with distance

---

## Main Scene Component:

### Mouse Tracking:

```jsx
const mouse = useRef({ x: 0, y: 0 })
const targetMouse = useRef({ x: 0, y: 0 })
```
**What this is:**
- `mouse` - Current smoothed mouse position
- `targetMouse` - Actual mouse position (target to move toward)

```jsx
const handleMouseMove = (e) => {
  targetMouse.current = {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1
  }
}
```
**What this does:**
- Convert mouse pixel position to -1 to +1 range
- `e.clientX / window.innerWidth` gives 0 to 1
- Multiply by 2 gives 0 to 2
- Subtract 1 gives -1 to +1
- Y is negated because screen Y goes down, but 3D Y goes up

### Scroll Tracking:

```jsx
const handleScroll = () => {
  const scrollY = window.scrollY
  const maxScroll = document.body.scrollHeight - window.innerHeight
  targetScroll.current = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
}
```
**What this does:**
- `scrollY` - How many pixels scrolled
- `maxScroll` - Maximum possible scroll
- `scrollY / maxScroll` - Scroll progress from 0 to 1
- `Math.min(..., 1)` - Never go above 1

### Camera Animation:

```jsx
useFrame((state, delta) => {
  // Smooth mouse
  mouse.current.x = lerp(mouse.current.x, targetMouse.current.x, delta * 4)
  mouse.current.y = lerp(mouse.current.y, targetMouse.current.y, delta * 4)
```
**What this does:**
- `delta` is time since last frame (usually ~0.016 seconds for 60fps)
- `delta * 4` makes mouse follow at consistent speed regardless of framerate

```jsx
// Camera movement
const radius = 16 - scroll * 5
const angle = scroll * Math.PI * 0.4
const height = 2 + scroll * 6
```
**What this does:** As you scroll down the page:
- `radius` - Camera gets closer (16 → 11)
- `angle` - Camera rotates around (0 → 72 degrees)
- `height` - Camera rises (2 → 8)

```jsx
const baseX = Math.sin(angle) * radius
const baseZ = Math.cos(angle) * radius
```
**What this does:**
- Calculate X and Z from angle and radius
- This makes camera orbit in a circle around the center

```jsx
// Strong mouse parallax
const parallaxStrength = 4 * (1 - scroll * 0.3)
const mouseX = mouse.current.x * parallaxStrength
const mouseY = mouse.current.y * parallaxStrength * 0.6
```
**What this does:**
- Camera moves when you move mouse (parallax effect)
- Parallax gets weaker as you scroll (less distracting for reading)
- Y parallax is 60% of X (feels more natural)

```jsx
// Breathing motion
const breatheX = Math.sin(time * 0.15) * 0.4
const breatheY = Math.cos(time * 0.12) * 0.3
```
**What this does:**
- Subtle constant camera movement
- Creates a "breathing" feel even without mouse movement
- Different speeds for X and Y so it doesn't feel mechanical

### Scene Lighting:

```jsx
<ambientLight intensity={0.12} color="#e0e7ff" />
```
**What this is:** Base light that hits everything equally (no shadows)

```jsx
<directionalLight
  position={[10, 15, 8]}
  intensity={1.8}
  color="#c7d2fe"
  castShadow
  shadow-mapSize={[2048, 2048]}
/>
```
**What this is:** Sun-like light from one direction
- `position={[10, 15, 8]}` - Light source position
- `castShadow` - Creates shadows
- `shadow-mapSize={[2048, 2048]}` - Shadow quality (higher = sharper but slower)

```jsx
<pointLight position={[0, 0, 0]} intensity={2.5} color="#6366f1" distance={15} decay={2} />
```
**What this is:** Light at the center (inside the orb) making it glow

```jsx
<spotLight
  position={[0, 18, 0]}
  angle={0.4}
  penumbra={1}
  intensity={1.2}
  color="#818cf8"
  castShadow
/>
```
**What this is:** Spotlight from above
- `angle={0.4}` - Cone angle in radians (~23 degrees)
- `penumbra={1}` - Soft edges (1 = fully soft)

### Post Processing:

```jsx
<EffectComposer multisampling={4}>
```
**What this is:** Combines all visual effects. `multisampling={4}` smooths edges.

```jsx
<Bloom
  luminanceThreshold={0.1}
  luminanceSmoothing={0.95}
  intensity={1.4}
  radius={0.9}
  mipmapBlur
/>
```
**What this does:** Makes bright things glow
- `luminanceThreshold={0.1}` - How bright something must be to glow
- `intensity={1.4}` - How strong the glow is
- `radius={0.9}` - How far the glow spreads

```jsx
<ChromaticAberration
  offset={[0.0004, 0.0004]}
/>
```
**What this does:** Slight RGB color separation (like a lens effect)

```jsx
<Noise opacity={0.012} />
```
**What this does:** Adds film grain texture

```jsx
<Vignette darkness={0.55} />
```
**What this does:** Darkens the edges of the screen (cinematic effect)

---

# 5. Hero.jsx - The Welcome Section

**Location:** `src/components/sections/Hero.jsx`

**What it does:** The first thing visitors see - your name, title, and introduction.

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.8,
      staggerChildren: 0.12
    }
  }
}
```
**What this does:**
- `hidden` - Initial state: invisible
- `visible` - Final state: fully visible
- `delayChildren: 1.8` - Wait 1.8 seconds before animating children
- `staggerChildren: 0.12` - Each child animates 0.12 seconds after the previous

```jsx
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}
```
**What this does:** Each text element:
- Starts invisible, 50 pixels below, and blurry
- Animates to visible, in position, and sharp
- `ease: [0.16, 1, 0.3, 1]` - Custom easing curve for smooth motion

```jsx
const handleScroll = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}
```
**What this does:** When you click the scroll indicator, smoothly scrolls down one screen height.

---

# 6. About.jsx - About You Section

**Location:** `src/components/sections/About.jsx`

```jsx
const skills = [
  { name: 'Angular', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  // ... more skills
]
```
**What this is:** Array of your skills to display.

```jsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-100px' })
```
**What this does:**
- `useRef(null)` - Creates a reference to the section element
- `useInView` - Detects when the section is visible on screen
- `once: true` - Only trigger animation once (not when scrolling back)
- `margin: '-100px'` - Trigger 100px before element is fully in view

```jsx
<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={containerVariants}
>
```
**What this does:**
- When section comes into view, change from 'hidden' to 'visible'
- This triggers all the child animations

---

# 7. Experience.jsx - Work History

**Location:** `src/components/sections/Experience.jsx`

```jsx
const experiences = [
  {
    company: 'Aurionpro Solutions',
    role: 'Software Developer',
    period: 'Oct 2025 - Present',
    description: 'Working on enterprise-level applications...',
    current: true
  },
  // ... more experiences
]
```
**What this is:** Your work history data.

```jsx
<motion.div 
  className={`experience-card ${experience.current ? 'current' : ''}`}
  whileHover={{ 
    y: -5,
    transition: { duration: 0.3 }
  }}
>
```
**What this does:**
- Adds 'current' class if it's your current job
- When you hover, card moves up 5 pixels

---

# 8. Projects.jsx - Your Work

**Location:** `src/components/sections/Projects.jsx`

```jsx
const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}
```
**What this does:** Creates a 3D tilt effect on project cards:
1. Get mouse position relative to card
2. Calculate distance from center
3. Divide by 10 to reduce rotation intensity
4. Apply 3D rotation with perspective

---

# 9. Contact.jsx - How to Reach You

**Location:** `src/components/sections/Contact.jsx`

Contains your email, phone, and social media links. Uses same animation patterns as other sections.

---

# 10. Navbar.jsx - Navigation Menu

**Location:** `src/components/ui/Navbar.jsx`

```jsx
const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```
**What this does:**
- Track if user has scrolled more than 50 pixels
- When scrolled, navbar gets different styling (more solid background)

---

# 11. Footer.jsx - Bottom Section

**Location:** `src/components/ui/Footer.jsx`

Simple footer with copyright and social links. Uses Framer Motion for entrance animations.

---

# 12. Loader.jsx - Loading Screen

**Location:** `src/components/ui/Loader.jsx`

```jsx
const barVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: { duration: 2, ease: 'easeInOut' }
  }
}
```
**What this does:** Progress bar grows from 0 to full width over 2 seconds.

---

# 13. index.css - All The Styles

**Location:** `src/styles/index.css`

## CSS Variables:

```css
:root {
  --primary: #6366f1;
```
**What this is:** Root variables available everywhere. Use as `var(--primary)`.

## Color System:

| Variable | Color | Usage |
|----------|-------|-------|
| `--primary` | #6366f1 | Main brand color (indigo) |
| `--primary-light` | #818cf8 | Lighter version for hovers |
| `--accent` | #8b5cf6 | Secondary color (purple) |
| `--bg-dark` | #030305 | Main background (nearly black) |
| `--text-primary` | #fafafa | Main text (nearly white) |
| `--text-muted` | rgba(250,250,250,0.45) | Subtle text (45% white) |

## Glassmorphism:

```css
.navbar {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}
```
**What this does:**
- Semi-transparent background
- Blurs everything behind it
- Subtle border for definition

## Animations:

```css
@keyframes shimmer {
  0% { background-position: -200% 50%; }
  100% { background-position: 200% 50%; }
}
```
**What this does:** Creates a shimmering effect by moving a gradient.

## Responsive Design:

```css
@media (max-width: 768px) {
  .hero-name {
    font-size: 2.5rem;
  }
}
```
**What this does:** When screen is 768px or smaller, reduce font size.

---

# Quick Reference

## Animation Easing Cheat Sheet:

| Easing | Feel |
|--------|------|
| `[0.16, 1, 0.3, 1]` | Smooth deceleration (most used) |
| `[0.65, 0, 0.35, 1]` | Smooth both ways |
| `easeInOut` | Standard smooth |

## Common Three.js Values:

| Value | Meaning |
|-------|---------|
| `Math.PI` | 180 degrees |
| `Math.PI / 2` | 90 degrees |
| `Math.PI * 2` | 360 degrees (full rotation) |

## Lerp Speed Guide:

| Value | Speed |
|-------|-------|
| `0.01` | Very slow (laggy follow) |
| `0.05` | Smooth (default) |
| `0.1` | Quick but smooth |
| `0.5` | Fast |
| `1.0` | Instant |

---

*This guide covers every component in detail. If you have questions about specific parts, refer to the relevant section above!*
