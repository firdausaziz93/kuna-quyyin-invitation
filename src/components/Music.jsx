import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function Music({ autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef(null)
  const hasAutoPlayed = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [])

  // Auto play when autoPlay prop is true
  useEffect(() => {
    if (autoPlay && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true
      // Small delay to ensure audio is ready
      setTimeout(() => {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.log('Auto-play prevented by browser:', err)
          })
      }, 500)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={togglePlay}
            className="glass-card glass-refraction w-14 h-14 flex items-center justify-center group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isPlaying ? { 
              boxShadow: ['0 0 0 0 rgba(255,255,255,0.1)', '0 0 0 10px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.1)']
            } : {}}
            transition={isPlaying ? { 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{ borderRadius: '50%' }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-white"
                    animate={{
                      height: ['8px', '16px', '8px'],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -top-10 right-0 whitespace-nowrap"
          >
            <span className="glass-card px-3 py-1.5 font-dm font-light text-xs text-slate-400">
              {isPlaying ? 'Musik sedang dimainkan' : 'Tekan untuk muzik'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Music
