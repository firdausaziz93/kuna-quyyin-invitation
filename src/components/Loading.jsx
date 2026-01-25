import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Loading() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 3,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-navy to-deep-purple"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="glass-particle"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card glass-refraction p-12 text-center"
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <h1 className="font-playfair font-light text-3xl md:text-4xl text-white mb-4">
            Azrien
          </h1>
          <div className="w-12 h-px bg-white/30 mx-auto my-4" />
          <h1 className="font-playfair font-light text-3xl md:text-4xl text-white">
            Fatin
          </h1>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/50"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ borderRadius: '50%' }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Loading
