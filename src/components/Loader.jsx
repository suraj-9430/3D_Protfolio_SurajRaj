import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ progress }) {
  return (
    <AnimatePresence>
      <motion.div
        className="loader-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.div
          className="loader-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AZURE
        </motion.div>
        
        <motion.div
          className="loader-progress-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="loader-progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.div
          className="loader-percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
