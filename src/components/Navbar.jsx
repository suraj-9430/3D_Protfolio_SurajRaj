import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'rgba(10, 10, 10, 0.6)',
      }}
    >
      <a href="#" className="navbar-logo">AZURE ESTATE</a>
      
      <ul className="navbar-links">
        <li><a href="#residences">Residences</a></li>
        <li><a href="#amenities">Amenities</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#location">Location</a></li>
      </ul>
      
      <button className="navbar-contact">
        Schedule Visit
      </button>
      
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </motion.nav>
  )
}
