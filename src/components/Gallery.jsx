import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const galleryItems = [
  { id: 1, title: 'Living Room', subtitle: 'Grand Open Concept' },
  { id: 2, title: 'Master Suite', subtitle: 'Private Sanctuary' },
  { id: 3, title: 'Kitchen', subtitle: 'Chef\'s Paradise' },
  { id: 4, title: 'Terrace', subtitle: 'Ocean Views' },
  { id: 5, title: 'Pool Deck', subtitle: 'Infinity Edge' },
  { id: 6, title: 'Garden', subtitle: 'Tropical Oasis' }
]

function GalleryItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Generate gradient backgrounds for placeholder
  const gradients = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
    'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    'linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)',
    'linear-gradient(135deg, #1a2a3a 0%, #2a4a5a 100%)',
    'linear-gradient(135deg, #1a2a1a 0%, #2a4a2a 100%)'
  ]

  return (
    <motion.div
      ref={ref}
      className="gallery-item"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ scale: 1.02 }}
      style={{ background: gradients[index] }}
    >
      {/* Decorative elements to simulate room content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.1
      }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="0.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      
      <div className="gallery-item-content">
        <h3 className="gallery-item-title">{item.title}</h3>
        <p className="gallery-item-subtitle">{item.subtitle}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        ref={headerRef}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-tagline">Interior Gallery</p>
        <h2 className="section-title">Crafted Elegance</h2>
      </motion.div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <GalleryItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
