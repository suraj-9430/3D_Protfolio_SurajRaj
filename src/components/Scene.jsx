import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  ContactShadows,
  Float,
  MeshReflectorMaterial
} from '@react-three/drei'
import * as THREE from 'three'

// Luxury Villa Model using simple geometries
function Villa() {
  const groupRef = useRef()
  
  // Materials
  const materials = useMemo(() => ({
    concrete: new THREE.MeshStandardMaterial({ 
      color: '#f5f5f0',
      roughness: 0.8,
      metalness: 0.1
    }),
    glass: new THREE.MeshPhysicalMaterial({ 
      color: '#88ccff',
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      envMapIntensity: 1
    }),
    wood: new THREE.MeshStandardMaterial({ 
      color: '#8B5A2B',
      roughness: 0.7,
      metalness: 0.05
    }),
    metal: new THREE.MeshStandardMaterial({ 
      color: '#2a2a2a',
      roughness: 0.3,
      metalness: 0.8
    }),
    pool: new THREE.MeshPhysicalMaterial({ 
      color: '#0099cc',
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 1
    }),
    accent: new THREE.MeshStandardMaterial({ 
      color: '#D4AF37',
      roughness: 0.3,
      metalness: 0.7
    })
  }), [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main Platform/Foundation */}
      <mesh position={[0, -0.25, 0]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[25, 0.5, 20]} />
      </mesh>

      {/* Main Building - Ground Floor */}
      <mesh position={[0, 2, 0]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[18, 4, 14]} />
      </mesh>

      {/* Upper Floor - Offset Design */}
      <mesh position={[2, 5.5, 0]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[14, 3, 12]} />
      </mesh>

      {/* Penthouse Level */}
      <mesh position={[4, 8, 0]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[8, 2, 8]} />
      </mesh>

      {/* Large Glass Windows - Ground Floor Front */}
      <mesh position={[0, 2, 7.1]} material={materials.glass}>
        <boxGeometry args={[16, 3.5, 0.1]} />
      </mesh>

      {/* Glass Windows - Ground Floor Side */}
      <mesh position={[-9.1, 2, 0]} material={materials.glass}>
        <boxGeometry args={[0.1, 3.5, 12]} />
      </mesh>

      {/* Upper Floor Windows */}
      <mesh position={[2, 5.5, 6.1]} material={materials.glass}>
        <boxGeometry args={[12, 2.5, 0.1]} />
      </mesh>

      {/* Upper Floor Side Windows */}
      <mesh position={[-5.1, 5.5, 0]} material={materials.glass}>
        <boxGeometry args={[0.1, 2.5, 10]} />
      </mesh>

      {/* Penthouse Windows */}
      <mesh position={[4, 8, 4.1]} material={materials.glass}>
        <boxGeometry args={[6, 1.5, 0.1]} />
      </mesh>

      {/* Balcony - Ground Floor */}
      <mesh position={[0, 0.15, 10]} receiveShadow castShadow material={materials.wood}>
        <boxGeometry args={[20, 0.3, 6]} />
      </mesh>

      {/* Balcony Railings */}
      <mesh position={[0, 0.8, 12.9]} material={materials.metal}>
        <boxGeometry args={[20, 1, 0.1]} />
      </mesh>
      <mesh position={[-10, 0.8, 10]} material={materials.metal}>
        <boxGeometry args={[0.1, 1, 6]} />
      </mesh>
      <mesh position={[10, 0.8, 10]} material={materials.metal}>
        <boxGeometry args={[0.1, 1, 6]} />
      </mesh>

      {/* Upper Balcony */}
      <mesh position={[2, 4.15, 8]} receiveShadow castShadow material={materials.wood}>
        <boxGeometry args={[10, 0.3, 4]} />
      </mesh>

      {/* Upper Balcony Railings */}
      <mesh position={[2, 4.8, 9.9]} material={materials.glass}>
        <boxGeometry args={[10, 0.8, 0.1]} />
      </mesh>

      {/* Infinity Pool */}
      <mesh position={[-6, -0.1, 12]} receiveShadow>
        <boxGeometry args={[10, 0.8, 5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[-6, 0.1, 12]} material={materials.pool}>
        <boxGeometry args={[9.6, 0.4, 4.6]} />
      </mesh>

      {/* Pool Edge */}
      <mesh position={[-6, 0.35, 14.6]} material={materials.accent}>
        <boxGeometry args={[10.5, 0.1, 0.3]} />
      </mesh>

      {/* Roof Details */}
      <mesh position={[4, 9.1, 0]} receiveShadow castShadow material={materials.metal}>
        <boxGeometry args={[9, 0.2, 9]} />
      </mesh>

      {/* Garage Area */}
      <mesh position={[-10, 1.5, -5]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[5, 3, 8]} />
      </mesh>

      {/* Garage Door */}
      <mesh position={[-10, 1.5, -1.1]} material={materials.metal}>
        <boxGeometry args={[4, 2.5, 0.2]} />
      </mesh>

      {/* Landscaping - Trees */}
      <Tree position={[11, 0, 8]} />
      <Tree position={[12, 0, -5]} scale={0.8} />
      <Tree position={[-12, 0, 8]} scale={1.2} />
      
      {/* Decorative Columns */}
      <mesh position={[-8, 2, 7]} receiveShadow castShadow material={materials.concrete}>
        <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
      </mesh>
      <mesh position={[8, 2, 7]} receiveShadow castShadow material={materials.concrete}>
        <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
      </mesh>

      {/* Entrance Steps */}
      <mesh position={[0, 0.1, 8]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[6, 0.2, 2]} />
      </mesh>
      <mesh position={[0, 0.3, 8.5]} receiveShadow castShadow material={materials.concrete}>
        <boxGeometry args={[5, 0.2, 1.5]} />
      </mesh>

      {/* Lighting Fixtures */}
      <mesh position={[-9, 3.5, 7]} material={materials.accent}>
        <sphereGeometry args={[0.15, 16, 16]} />
      </mesh>
      <mesh position={[9, 3.5, 7]} material={materials.accent}>
        <sphereGeometry args={[0.15, 16, 16]} />
      </mesh>

      {/* Garden Path */}
      <mesh position={[5, 0.02, 13]} receiveShadow material={materials.concrete}>
        <boxGeometry args={[1.5, 0.04, 8]} />
      </mesh>

      {/* Outdoor Furniture - Lounge Chairs */}
      <LoungeChair position={[2, 0.3, 11]} />
      <LoungeChair position={[4, 0.3, 11]} />
    </group>
  )
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 3, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[1.5, 4, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      <mesh position={[0, 5.5, 0]} castShadow>
        <coneGeometry args={[1, 3, 8]} />
        <meshStandardMaterial color="#3d7a37" roughness={0.8} />
      </mesh>
    </group>
  )
}

function LoungeChair({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 2]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.6, 0.05, 1.8]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
      </mesh>
    </group>
  )
}

// Ground with reflection
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.5}
      />
    </mesh>
  )
}

// Main Scene Component
export default function Scene() {
  const { camera } = useThree()
  const mousePos = useRef({ x: 0, y: 0 })
  const scrollProgress = useRef(0)
  const initialCameraPos = useRef(new THREE.Vector3(30, 15, 30))
  const targetCameraPos = useRef(new THREE.Vector3(30, 15, 30))
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      scrollProgress.current = Math.min(scrollY / maxScroll, 1)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cinematic fly-in animation
  useEffect(() => {
    // Start from far away
    camera.position.set(80, 40, 80)
    camera.lookAt(0, 2, 0)
  }, [camera])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    
    // Cinematic fly-in during first few seconds
    const flyInProgress = Math.min(time / 4, 1)
    const easeOutCubic = 1 - Math.pow(1 - flyInProgress, 3)
    
    // Calculate scroll-based camera position
    const scroll = scrollProgress.current
    const baseRadius = 25 - scroll * 10
    const baseAngle = scroll * Math.PI * 0.8
    const baseHeight = 12 - scroll * 6
    
    // Scroll-based camera position
    const scrollX = Math.sin(baseAngle) * baseRadius
    const scrollZ = Math.cos(baseAngle) * baseRadius
    const scrollY = baseHeight
    
    // Initial position
    const startX = 80
    const startY = 40
    const startZ = 80
    
    // Target position after fly-in
    const targetX = scrollX
    const targetY = scrollY
    const targetZ = scrollZ
    
    // Interpolate based on fly-in progress
    let camX = THREE.MathUtils.lerp(startX, targetX, easeOutCubic)
    let camY = THREE.MathUtils.lerp(startY, targetY, easeOutCubic)
    let camZ = THREE.MathUtils.lerp(startZ, targetZ, easeOutCubic)
    
    // Add subtle mouse parallax
    const mouseInfluence = 2
    camX += mousePos.current.x * mouseInfluence
    camY += mousePos.current.y * mouseInfluence * 0.5
    
    // Add gentle floating motion
    camY += Math.sin(time * 0.5) * 0.3
    camX += Math.sin(time * 0.3) * 0.2
    
    // Smooth camera movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, delta * 2)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, delta * 2)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, delta * 2)
    
    // Look at target (balcony area when scrolled)
    const lookAtY = 2 + scroll * 2
    const lookAtZ = scroll * 5
    camera.lookAt(0, lookAtY, lookAtZ)
  })

  return (
    <>
      {/* Environment Lighting - Sunset */}
      <Environment preset="sunset" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 30, 100]} />
      
      {/* Warm Sunset Directional Light */}
      <directionalLight
        position={[20, 30, 10]}
        intensity={2}
        color="#ffaa55"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0001}
      />
      
      {/* Secondary Light */}
      <directionalLight
        position={[-10, 20, -10]}
        intensity={0.5}
        color="#ff8844"
      />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color="#ffddcc" />
      
      {/* Point lights for accent */}
      <pointLight position={[-9, 4, 7]} intensity={0.5} color="#ffcc00" distance={10} />
      <pointLight position={[9, 4, 7]} intensity={0.5} color="#ffcc00" distance={10} />
      
      {/* Hemisphere Light */}
      <hemisphereLight
        skyColor="#ff8855"
        groundColor="#222222"
        intensity={0.4}
      />
      
      {/* Villa Model */}
      <Float
        speed={0.5}
        rotationIntensity={0}
        floatIntensity={0.1}
      >
        <Villa />
      </Float>
      
      {/* Reflective Ground */}
      <Ground />
      
      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -0.49, 0]}
        opacity={0.6}
        scale={50}
        blur={2}
        far={20}
      />
    </>
  )
}
