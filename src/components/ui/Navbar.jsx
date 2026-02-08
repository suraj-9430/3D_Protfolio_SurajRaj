import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 1.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const linkVariants = {
    hover: {
      y: -2,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a 
        href="#" 
        className="navbar-logo"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        suraj<span>.</span>dev
      </motion.a>

      <ul className="navbar-links">
        {['About', 'Projects', 'Contact'].map((item) => (
          <motion.li key={item} variants={linkVariants} whileHover="hover">
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </motion.li>
        ))}
      </ul>

      <motion.a 
        href="https://drive.google.com/file/d/1gBGXYrQYmt83MdUSHeLHwRYLZcprQRl9/view"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-cta"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        <span>Resume</span>
      </motion.a>

      <button className="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </motion.nav>
  )
}
