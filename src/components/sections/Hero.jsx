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
          Fullstack <span>Developer</span> | MEAN Stack
        </motion.h2>

        <motion.p className="hero-description" variants={itemVariants}>
          Clean design. Scalable code. Meaningful results. I turn ideas into 
          scalable software with expertise in Angular, Node.js, Express.js, 
          and MongoDB.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Projects</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
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
