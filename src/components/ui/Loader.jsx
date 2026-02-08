import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ progress }) {
  return (
    <AnimatePresence>
      <motion.div
        className="loader"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1] 
          }
        }}
      >
        {/* Subtle background animation */}
        <motion.div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div
          className="loader-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.div 
            className="loader-name"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Suraj Raj
          </motion.div>
          
          <div className="loader-bar-container">
            <motion.div
              className="loader-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          </div>
          
          <motion.div 
            className="loader-percent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
