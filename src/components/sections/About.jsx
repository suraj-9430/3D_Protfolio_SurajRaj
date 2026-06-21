import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { title: 'Frontend', description: 'Angular, React, HTML/CSS, Bootstrap' },
  { title: 'Backend', description: 'Node.js, Express.js, RabbitMQ, REST' },
  { title: 'Languages', description: 'JavaScript, TypeScript, Python' },
  { title: 'Databases & Tools', description: 'MongoDB, MySQL, Oracle, Git' }
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.4 + i * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  return (
    <section className="about" id="about">
      <motion.div
        ref={ref}
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="about-text">
          <motion.h2 variants={itemVariants}>
            Building <span>scalable</span> software solutions
          </motion.h2>
          <motion.p variants={itemVariants}>
            Full Stack Developer with 1 year and 7 months of hands-on experience building and 
            deploying production-grade applications for banking clients. Currently working 
            as a Software Developer at Aurionpro Solutions.
          </motion.p>
          <motion.p variants={itemVariants}>
            Specialised in Node.js backend development, RESTful API design, and frontend 
            development using React and Angular. Currently contributing to AI-driven product 
            development and scalable banking modules.
          </motion.p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="skill-item"
              custom={index}
              variants={skillVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <h4>{skill.title}</h4>
              <p>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
