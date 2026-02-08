import { motion } from 'framer-motion'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-tagline" variants={itemVariants}>
          Exclusive Oceanfront Living
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          Where Luxury <span>Meets</span> Paradise
        </motion.h1>
        
        <motion.p className="hero-description" variants={itemVariants}>
          Discover an unparalleled living experience in our exclusive collection of 
          oceanfront villas. Every detail crafted for those who demand nothing but 
          the extraordinary.
        </motion.p>
        
        <motion.button 
          className="hero-cta"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Residences
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.button>
      </motion.div>
      
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={handleScrollClick}
      >
        <span>Scroll to Explore</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  )
}
