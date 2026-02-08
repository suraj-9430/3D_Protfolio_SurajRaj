import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    id: 1,
    company: 'Aurionpro Solutions',
    role: 'Software Developer',
    period: 'Oct 2025 - Present',
    description: 'Developed and optimized scalable full stack web applications using Angular, Node.js, Express.js, and MongoDB. Implemented modular front-end architecture enabling clean code and maintainability, while building secure and efficient backend APIs.',
    note: 'Acquired Fintra Software Solutions'
  },
  {
    id: 2,
    company: 'Fintra Software',
    role: 'Junior Software Developer',
    period: 'Oct 2024 - Sep 2025',
    description: 'Worked on Angular and Node.js-based applications focusing on UI performance and stability. Applied routing, data binding, and component-based architecture. Assisted in debugging, feature development, and deployment support.',
    note: null
  }
]

function ExperienceCard({ experience, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      className="experience-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="experience-header">
        <div className="experience-company">
          <h3>{experience.company}</h3>
          {experience.note && <span className="experience-note">{experience.note}</span>}
        </div>
        <span className="experience-period">{experience.period}</span>
      </div>
      <h4 className="experience-role">{experience.role}</h4>
      <p className="experience-description">{experience.description}</p>
    </motion.div>
  )
}

export default function Experience() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section className="experience" id="experience">
      <motion.div
        ref={headerRef}
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p 
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Career
        </motion.p>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Work Experience
        </motion.h2>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}
