import { motion } from 'framer-motion'

export default function Hero() {
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

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="hero">
      <motion.div 
        className="hero-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-greeting" variants={itemVariants}>
          Hello, I'm
        </motion.p>

        <motion.h1 className="hero-name" variants={itemVariants}>
          <span className="hero-name-gradient">Suraj Raj</span>
        </motion.h1>

        <motion.h2 className="hero-title" variants={itemVariants}>
          Full Stack <span>Developer</span>
        </motion.h2>

        <motion.p className="hero-description" variants={itemVariants}>
          1.5+ years of experience building production-grade applications for banking clients. 
          I turn ideas into scalable software with expertise in Node.js, React, and Angular, 
          alongside AI-driven product development.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.a
            href="https://drive.google.com/file/d/1tzcR--e-OuDyJ3sPvKiOPeA_dqxhI8yC/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Download Resume</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px', width: '20px', height: '20px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get in Touch</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hero-3d-hint"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cursor-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l7 17l2.5-6.5L20 12L4 4z" />
          </svg>
        </div>
        <span>Move cursor to interact</span>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onClick={handleScroll}
      >
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  )
}
