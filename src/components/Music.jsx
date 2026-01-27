import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import weddingSong from '../sound/SABHI SADDI feat. Marsha - Cinta Sesungguhnya.mp3'

function Music({ autoPlay = false, sharedAudioRef = null }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const internalAudioRef = useRef(null)
  const audioRef = sharedAudioRef || internalAudioRef
  const hasAutoPlayed = useRef(false)

  useEffect(() => {
    if (!sharedAudioRef) {
      audioRef.current = new Audio(weddingSong)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    return () => {
      if (!sharedAudioRef && audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [sharedAudioRef])

  useEffect(() => {
    if (autoPlay && audioRef.current && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true
      setTimeout(() => {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Auto-play prevented:', err))
      }, 800)
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={togglePlay}
        className="bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 w-12 h-12 flex items-center justify-center group rounded-full"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gray-700 rounded-full"
                  animate={{ height: ['6px', '14px', '6px'] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.svg
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-4 h-4 text-gray-600 group-hover:text-gray-800 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export default Music
