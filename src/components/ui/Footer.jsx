import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.footer
      ref={ref}
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Developed by Suraj Raj &copy; 2025
      </motion.p>
      
      <div className="footer-links">
        {[
          { name: 'GitHub', url: 'https://github.com/suraj-9430' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/suraj663' },
          { name: 'Twitter', url: 'https://x.com/SurajRa53718852' }
        ].map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              delay: 0.3 + i * 0.1, 
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>
    </motion.footer>
  )
}
