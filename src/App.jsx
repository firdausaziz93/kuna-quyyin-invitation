import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Passcode from './components/Passcode'
import Loading from './components/Loading'
import Hero from './components/Hero'
import Details from './components/Details'
import RSVP from './components/RSVP'
import Music from './components/Music'
import Share from './components/Share'
import floralBg from './img/floral-blue.png'

const Gallery = lazy(() => import('./components/Gallery'))

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [autoPlayMusic, setAutoPlayMusic] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }))
    setParticles(generated)
  }, [])

  const handleUnlock = (shouldPlayMusic = false) => {
    setIsLocked(false)
    setIsLoading(true)
    if (shouldPlayMusic) {
      setAutoPlayMusic(true)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-base" />
      
      {/* Floral Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url(${floralBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-blob w-[600px] h-[600px] bg-[#e8e4df] -top-40 -left-40" />
        <div className="ambient-blob w-[500px] h-[500px] bg-[#f0ece7] bottom-20 -right-40" />
        <div className="ambient-blob w-[300px] h-[300px] bg-[#e5e1dc] top-1/2 left-1/3" />
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="star-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
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
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Hero />
            <Details />
            <Suspense fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="glass-card p-8">
                  <div className="w-6 h-6 border border-white/20 border-t-white/60 animate-spin" style={{ borderRadius: '50%' }} />
                </div>
              </div>
            }>
              <Gallery />
            </Suspense>
            <RSVP />
            <Share />
            <Music autoPlay={autoPlayMusic} />
            
            <footer className="py-16 text-center">
              <div className="decorative-line max-w-xs mx-auto mb-8" />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-playfair text-lg text-gray-600"
              >
                Fatin & Azrien
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-dm text-xs text-gray-400 mt-2 tracking-elegant uppercase"
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
