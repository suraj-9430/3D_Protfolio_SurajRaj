import { useState, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/3d/Scene'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'

// Lazy load sections for performance
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact = lazy(() => import('./components/sections/Contact'))
const Footer = lazy(() => import('./components/ui/Footer'))

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        const increment = Math.random() * 8 + 2
        return Math.min(prev + increment, 100)
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader progress={progress} />}
      </AnimatePresence>
      
      <div className="canvas-container">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ 
            position: [0, 2, 16], 
            fov: 55,
            near: 0.1,
            far: 100
          }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          style={{ background: '#030305' }}
        >
          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            
            <main className="main-content">
              <Suspense fallback={null}>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Contact />
              </Suspense>
            </main>
            
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
