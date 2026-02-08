import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'Responsive Angular portfolio with NGX UI components, modern animations, routing, and lazy loading. Cross-device optimized and mobile-friendly.',
    tags: ['Angular', 'TypeScript', 'NGX UI'],
    year: '2025',
    link: null,
    color: '#6366f1'
  },
  {
    id: 2,
    title: 'Company Website (MEAN)',
    description: 'Single Page Application built with MEAN stack. Features optimized performance with lazy loading and responsive design.',
    tags: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    year: '2024',
    link: 'https://suraj-9430.github.io/CompanySite/',
    color: '#8b5cf6'
  },
  {
    id: 3,
    title: 'Brain Tumor Detection',
    description: 'Automated MRI analysis using deep learning with VGG-16 architecture. Published a research paper based on this project.',
    tags: ['Python', 'Flask', 'Deep Learning', 'VGG-16'],
    year: '2023',
    link: 'https://github.com/suraj-9430/Brain-tumor-Detection-System-VGG-16',
    color: '#a78bfa'
  },
  {
    id: 4,
    title: 'Face Recognition Attendance',
    description: 'Real-time facial recognition attendance system with Firebase-based secure data management and automated tracking.',
    tags: ['Python', 'OpenCV', 'Firebase'],
    year: '2023',
    link: null,
    color: '#818cf8'
  }
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 12, y: -x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.article
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image">
        <motion.div 
          className="project-placeholder"
          style={{ background: `linear-gradient(135deg, ${project.color}15, transparent)` }}
          animate={{
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="project-year">{project.year}</div>
        </motion.div>
      </div>

      <div className="project-content">
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
            View Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section className="projects" id="projects">
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
          My Work
        </motion.p>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.h2>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
