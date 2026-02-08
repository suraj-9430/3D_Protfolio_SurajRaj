import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    id: 1,
    title: 'Infinity Pool',
    description: 'Stunning infinity-edge pool overlooking the ocean, designed for ultimate relaxation.',
    icon: (
      <svg viewBox="0 0 60 60">
        <ellipse cx="30" cy="35" rx="25" ry="12" />
        <path d="M5 35 Q 15 25, 30 25 Q 45 25, 55 35" />
        <path d="M10 30 Q 20 22, 30 22 Q 40 22, 50 30" />
        <circle cx="45" cy="28" r="3" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Smart Home',
    description: 'Fully integrated smart home technology with voice control and automated systems.',
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M30 8 L50 25 L50 52 L10 52 L10 25 Z" />
        <rect x="24" y="35" width="12" height="17" />
        <rect x="16" y="28" width="8" height="8" />
        <rect x="36" y="28" width="8" height="8" />
        <circle cx="30" cy="18" r="4" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Ocean View',
    description: 'Panoramic floor-to-ceiling windows offering breathtaking views of the horizon.',
    icon: (
      <svg viewBox="0 0 60 60">
        <circle cx="45" cy="15" r="8" />
        <path d="M0 40 Q 10 35, 20 40 Q 30 45, 40 40 Q 50 35, 60 40" />
        <path d="M0 48 Q 15 43, 30 48 Q 45 53, 60 48" />
        <path d="M5 32 L15 28 L25 32 L35 26 L45 32" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Private Garden',
    description: 'Lush tropical landscaping with private gardens and outdoor living spaces.',
    icon: (
      <svg viewBox="0 0 60 60">
        <path d="M30 55 L30 30" />
        <ellipse cx="30" cy="22" rx="18" ry="14" />
        <path d="M20 30 Q 25 20, 30 22" />
        <path d="M40 30 Q 35 20, 30 22" />
        <ellipse cx="15" cy="50" rx="8" ry="4" />
        <ellipse cx="45" cy="50" rx="8" ry="4" />
        <circle cx="22" cy="18" r="3" />
        <circle cx="38" cy="16" r="2" />
      </svg>
    )
  }
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -10 }}
    >
      <div className="feature-icon">
        {feature.icon}
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  )
}

export default function Features() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className="features-section" id="amenities">
      <motion.div
        ref={headerRef}
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-tagline">Premium Amenities</p>
        <h2 className="section-title">Exceptional Living Standards</h2>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
