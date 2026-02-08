import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { id: 1, number: 12, suffix: '', label: 'Exclusive Villas' },
  { id: 2, number: 50000, suffix: '+', label: 'Sq Ft Living Space' },
  { id: 3, number: 100, suffix: '%', label: 'Ocean View' },
  { id: 4, number: 24, suffix: '/7', label: 'Concierge Service' }
]

function AnimatedNumber({ value, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.round(stepValue * currentStep))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, inView])

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return num
  }

  return (
    <span className="stat-number">
      {formatNumber(count)}{suffix}
    </span>
  )
}

function StatItem({ stat, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <AnimatedNumber value={stat.number} suffix={stat.suffix} inView={isInView} />
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatItem key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  )
}
