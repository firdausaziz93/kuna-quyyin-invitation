import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Passcode from './components/Passcode'
import Loading from './components/Loading'
import Hero from './components/Hero'
import Details from './components/Details'
import RSVP from './components/RSVP'
import Music from './components/Music'
import Share from './components/Share'

const Gallery = lazy(() => import('./components/Gallery'))

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [autoPlayMusic, setAutoPlayMusic] = useState(false)
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 2 + 1,
    }))
    setStars(generatedStars)
  }, [])

  const handleUnlock = (shouldPlayMusic = false) => {
    setIsLocked(false)
    setIsLoading(true)
    if (shouldPlayMusic) {
      setAutoPlayMusic(true)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-navy via-navy to-deep-purple" />
      
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-particle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {isLocked ? (
          <Passcode key="passcode" onUnlock={handleUnlock} />
        ) : isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Hero />
            <Details />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card glass-refraction p-8">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 animate-spin" style={{ borderRadius: '50%' }} />
                </div>
              </div>
            }>
              <Gallery />
            </Suspense>
            <RSVP />
            <Share />
            <Music autoPlay={autoPlayMusic} />
            
            <footer className="py-12 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-dm font-light text-sm text-slate-400"
              >
                Azrien & Fatin
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-dm font-light text-xs text-slate-500 mt-2"
              >
                15 Januari 2027
              </motion.p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
