import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  Environment,
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
  Trail
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// Smooth lerp
const lerp = (a, b, t) => a + (b - a) * t

// Mouse-reactive Central Orb
function ReactiveOrb({ mouse }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    if (meshRef.current) {
      // React to mouse position
      meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, mouse.current.y * 0.5 + t * 0.1, 0.05)
      meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, mouse.current.x * 0.5 + t * 0.15, 0.05)
      
      // Subtle scale pulse based on mouse distance from center
      const mouseDistance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2)
      const targetScale = 1 + mouseDistance * 0.1 + Math.sin(t * 0.5) * 0.05
      meshRef.current.scale.setScalar(lerp(meshRef.current.scale.x, targetScale, 0.05))
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.25 + Math.sin(t * 0.5) * 0.05 + mouse.current.x * 0.1)
    }
    
    if (wireRef.current) {
      wireRef.current.rotation.x = -mouse.current.y * 0.3 + t * 0.05
      wireRef.current.rotation.y = mouse.current.x * 0.3 + t * 0.08
    }
  })

  return (
    <group>
      {/* Core sphere - follows mouse */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[2, 4]} />
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
        </mesh>
      </Float>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Wireframe - reacts to mouse */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial color="#a5b4fc" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

// Mouse-following Rings
function ReactiveRings({ mouse }) {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mx = mouse.current.x
    const my = mouse.current.y
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + my * 0.4 + Math.sin(t * 0.1) * 0.1
      ring1Ref.current.rotation.y = mx * 0.4
      ring1Ref.current.rotation.z = t * 0.12
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = my * 0.3
      ring2Ref.current.rotation.y = Math.PI / 4 + mx * 0.3 + t * 0.08
      ring2Ref.current.rotation.z = -t * 0.1
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -Math.PI / 4 + my * 0.2 + Math.cos(t * 0.08) * 0.1
      ring3Ref.current.rotation.y = mx * 0.2
      ring3Ref.current.rotation.z = t * 0.08
    }
  })

  return (
    <group>
      {/* Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[4.5, 0.04, 16, 200]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={1}
          roughness={0}
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[5.5, 0.025, 16, 200]} />
        <meshStandardMaterial
          color="#c4b5fd"
          metalness={1}
          roughness={0}
          emissive="#a78bfa"
          emissiveIntensity={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[7, 0.018, 16, 200]} />
        <meshStandardMaterial
          color="#e0e7ff"
          metalness={1}
          roughness={0}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

// Mouse-following Orbital Spheres with Trails
function OrbitalSpheres({ mouse }) {
  const sphere1Ref = useRef()
  const sphere2Ref = useRef()
  const sphere3Ref = useRef()
  const sphere4Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mx = mouse.current.x
    const my = mouse.current.y

    // Sphere 1 - orbits and reacts to mouse
    if (sphere1Ref.current) {
      const angle1 = t * 0.4 + mx * 0.5
      sphere1Ref.current.position.x = Math.cos(angle1) * 7
      sphere1Ref.current.position.z = Math.sin(angle1) * 7
      sphere1Ref.current.position.y = Math.sin(t * 0.3 + my) * 2 + my * 2
    }

    // Sphere 2
    if (sphere2Ref.current) {
      const angle2 = t * 0.35 + Math.PI * 0.66 + mx * 0.4
      sphere2Ref.current.position.x = Math.cos(angle2) * 8.5
      sphere2Ref.current.position.z = Math.sin(angle2) * 8.5
      sphere2Ref.current.position.y = Math.sin(t * 0.25 + 1) * 2.5 + my * 1.5
    }

    // Sphere 3
    if (sphere3Ref.current) {
      const angle3 = t * 0.3 + Math.PI * 1.33 + mx * 0.3
      sphere3Ref.current.position.x = Math.cos(angle3) * 9.5
      sphere3Ref.current.position.z = Math.sin(angle3) * 9.5
      sphere3Ref.current.position.y = Math.sin(t * 0.2 + 2) * 2 + my * 2
    }

    // Sphere 4 - follows mouse more directly
    if (sphere4Ref.current) {
      sphere4Ref.current.position.x = lerp(sphere4Ref.current.position.x, mx * 6, 0.02)
      sphere4Ref.current.position.y = lerp(sphere4Ref.current.position.y, my * 4 + 3, 0.02)
      sphere4Ref.current.position.z = lerp(sphere4Ref.current.position.z, -2, 0.02)
    }
  })

  return (
    <group>
      {/* Sphere 1 with trail */}
      <Trail width={2} length={8} color="#8b5cf6" attenuation={(t) => t * t}>
        <mesh ref={sphere1Ref} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color="#818cf8"
            speed={3}
            distort={0.3}
            metalness={0.9}
            roughness={0.1}
            emissive="#6366f1"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Trail>

      {/* Sphere 2 with trail */}
      <Trail width={1.5} length={6} color="#a78bfa" attenuation={(t) => t * t}>
        <mesh ref={sphere2Ref} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={1}
            roughness={0}
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Trail>

      {/* Sphere 3 with trail */}
      <Trail width={1} length={5} color="#6366f1" attenuation={(t) => t * t}>
        <mesh ref={sphere3Ref} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#c4b5fd"
            metalness={0.95}
            roughness={0.05}
            emissive="#a78bfa"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Trail>

      {/* Sphere 4 - Mouse follower */}
      <Trail width={3} length={12} color="#6366f1" attenuation={(t) => t * t * t}>
        <mesh ref={sphere4Ref} position={[0, 3, -2]} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#818cf8"
            metalness={1}
            roughness={0}
            emissive="#4f46e5"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Trail>
    </group>
  )
}

// Mouse-reactive floating shapes
function FloatingShapes({ mouse }) {
  const shapesRef = useRef([])

  const shapeConfigs = useMemo(() => [
    { type: 'octahedron', size: 0.9, basePos: [-7, 4, -5], color: '#818cf8', speed: 0.3 },
    { type: 'icosahedron', size: 0.7, basePos: [8, -2, -6], color: '#a78bfa', speed: 0.25 },
    { type: 'tetrahedron', size: 0.8, basePos: [-6, -4, 3], color: '#c4b5fd', speed: 0.35 },
    { type: 'dodecahedron', size: 0.6, basePos: [7, 5, 2], color: '#6366f1', speed: 0.28 },
    { type: 'box', size: 0.7, basePos: [-8, 0, -3], color: '#8b5cf6', speed: 0.32 },
    { type: 'cone', size: 0.6, basePos: [6, -5, 4], color: '#a5b4fc', speed: 0.22 },
  ], [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mx = mouse.current.x
    const my = mouse.current.y

    shapesRef.current.forEach((shape, i) => {
      if (shape) {
        const config = shapeConfigs[i]
        
        // Position reacts to mouse
        shape.position.x = config.basePos[0] + mx * (i % 2 === 0 ? 1.5 : -1.5)
        shape.position.y = config.basePos[1] + my * 1.5 + Math.sin(t * config.speed + i) * 0.8
        shape.position.z = config.basePos[2]
        
        // Rotation follows mouse
        shape.rotation.x = my * 0.5 + t * (config.speed * 0.5)
        shape.rotation.y = mx * 0.5 + t * (config.speed * 0.6)
        shape.rotation.z = t * config.speed * 0.3
      }
    })
  })

  return (
    <>
      {shapeConfigs.map((config, i) => (
        <Float key={i} speed={1 + i * 0.15} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh
            ref={el => shapesRef.current[i] = el}
            position={config.basePos}
            castShadow
          >
            {config.type === 'octahedron' && <octahedronGeometry args={[config.size]} />}
            {config.type === 'icosahedron' && <icosahedronGeometry args={[config.size]} />}
            {config.type === 'tetrahedron' && <tetrahedronGeometry args={[config.size]} />}
            {config.type === 'dodecahedron' && <dodecahedronGeometry args={[config.size]} />}
            {config.type === 'box' && <boxGeometry args={[config.size, config.size, config.size]} />}
            {config.type === 'cone' && <coneGeometry args={[config.size * 0.6, config.size, 6]} />}
            <meshStandardMaterial
              color={config.color}
              metalness={0.9}
              roughness={0.1}
              emissive={config.color}
              emissiveIntensity={0.35}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Interactive particles that react to mouse
function ReactiveParticles({ mouse, count = 80 }) {
  const particlesRef = useRef()
  
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
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        mouseInfluence: 0.5 + Math.random() * 1.5
      })
    }
    return temp
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      pos[i * 3] = p.basePosition.x
      pos[i * 3 + 1] = p.basePosition.y
      pos[i * 3 + 2] = p.basePosition.z
    })
    return pos
  }, [particles, count])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      const t = state.clock.elapsedTime
      const mx = mouse.current.x
      const my = mouse.current.y

      particles.forEach((p, i) => {
        const idx = i * 3
        // Base movement
        const baseX = p.basePosition.x + Math.sin(t * p.speed + p.offset) * 0.8
        const baseY = p.basePosition.y + Math.cos(t * p.speed * 0.8 + p.offset) * 0.8
        const baseZ = p.basePosition.z + Math.sin(t * p.speed * 0.6 + p.offset) * 0.5
        
        // Mouse influence
        positions[idx] = baseX + mx * p.mouseInfluence
        positions[idx + 1] = baseY + my * p.mouseInfluence
        positions[idx + 2] = baseZ
      })

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = t * 0.015 + mx * 0.2
      particlesRef.current.rotation.x = my * 0.1
    }
  })

  return (
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
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Cursor light that follows mouse
function CursorLight({ mouse }) {
  const lightRef = useRef()

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = lerp(lightRef.current.position.x, mouse.current.x * 10, 0.08)
      lightRef.current.position.y = lerp(lightRef.current.position.y, mouse.current.y * 8 + 5, 0.08)
      lightRef.current.position.z = 8
    }
  })

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
}

// Main Scene
export default function Scene() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const scrollProgress = useRef(0)
  const targetScroll = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      targetScroll.current = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Smooth mouse interpolation
    mouse.current.x = lerp(mouse.current.x, targetMouse.current.x, delta * 4)
    mouse.current.y = lerp(mouse.current.y, targetMouse.current.y, delta * 4)

    // Smooth scroll
    scrollProgress.current = lerp(scrollProgress.current, targetScroll.current, delta * 2)
    const scroll = scrollProgress.current

    // Camera movement
    const radius = 16 - scroll * 5
    const angle = scroll * Math.PI * 0.4
    const height = 2 + scroll * 6

    const baseX = Math.sin(angle) * radius
    const baseZ = Math.cos(angle) * radius
    const baseY = height

    // Strong mouse parallax
    const parallaxStrength = 4 * (1 - scroll * 0.3)
    const mouseX = mouse.current.x * parallaxStrength
    const mouseY = mouse.current.y * parallaxStrength * 0.6

    // Breathing motion
    const breatheX = Math.sin(time * 0.15) * 0.4
    const breatheY = Math.cos(time * 0.12) * 0.3

    camera.position.x = lerp(camera.position.x, baseX + mouseX + breatheX, delta * 2)
    camera.position.y = lerp(camera.position.y, baseY + mouseY + breatheY, delta * 2)
    camera.position.z = lerp(camera.position.z, baseZ, delta * 2)

    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Background */}
      <color attach="background" args={['#030305']} />
      <fog attach="fog" args={['#030305', 12, 45]} />

      {/* Environment */}
      <Environment preset="night" />

      {/* Stars */}
      <Stars
        radius={80}
        depth={60}
        count={2500}
        factor={3}
        saturation={0.2}
        fade
        speed={0.4}
      />

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={30}
        size={1.8}
        speed={0.25}
        opacity={0.5}
        color="#8b5cf6"
      />

      {/* Lighting */}
      <ambientLight intensity={0.12} color="#e0e7ff" />
      
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.8}
        color="#c7d2fe"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      <directionalLight position={[-8, 8, -8]} intensity={0.7} color="#a5b4fc" />
      <directionalLight position={[0, -8, 12]} intensity={0.5} color="#c4b5fd" />

      <pointLight position={[0, 0, 0]} intensity={2.5} color="#6366f1" distance={15} decay={2} />
      <pointLight position={[8, 5, 8]} intensity={1} color="#8b5cf6" distance={18} decay={2} />

      <spotLight
        position={[0, 18, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1.2}
        color="#818cf8"
        castShadow
      />

      {/* Cursor-following light */}
      <CursorLight mouse={mouse} />

      {/* 3D Content - All react to mouse */}
      <ReactiveOrb mouse={mouse} />
      <ReactiveRings mouse={mouse} />
      <OrbitalSpheres mouse={mouse} />
      <FloatingShapes mouse={mouse} />
      <ReactiveParticles mouse={mouse} count={100} />

      {/* Post Processing */}
      <EffectComposer multisampling={4}>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.95}
          intensity={1.4}
          radius={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0004, 0.0004]}
        />
        <Noise opacity={0.012} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.15} darkness={0.55} />
      </EffectComposer>
    </>
  )
}
