import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Passcode from './components/Passcode'
import GateOpen from './components/GateOpen'
import Hero from './components/Hero'
import Details from './components/Details'
import RSVP from './components/RSVP'
import Music from './components/Music'
import Share from './components/Share'
import floralBg from './img/floral-blue.png'
import weddingSong from './sound/SABHI SADDI feat. Marsha - Cinta Sesungguhnya.mp3'

const Gallery = lazy(() => import('./components/Gallery'))

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [showGate, setShowGate] = useState(false)
  const [autoPlayMusic, setAutoPlayMusic] = useState(false)
  const [particles, setParticles] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio instance at App level to allow unlocking before Music component mounts
    audioRef.current = new Audio(weddingSong)
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const unlockAudio = () => {
    if (audioRef.current) {
      // Setup silent play to unlock audio context on iOS/Safari
      audioRef.current.play().then(() => {
        audioRef.current.pause() 
      }).catch(err => console.log("Audio unlock interaction failed", err))
    }
  }

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
    setShowGate(true)
    if (shouldPlayMusic) {
      setAutoPlayMusic(true)
    }
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
          <Passcode key="passcode" onUnlock={handleUnlock} onStartInteraction={unlockAudio} />
        ) : (
          <motion.div key="main-content" className="relative">
            <AnimatePresence>
              {showGate && <GateOpen key="gate" onAnimationComplete={() => setShowGate(false)} />}
            </AnimatePresence>
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
              {/* <Gallery /> */}
            </Suspense>
            <RSVP />
            <Share />
            <Music autoPlay={autoPlayMusic} sharedAudioRef={audioRef} />
            
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
                06 Jun 2026
              </motion.p>
            </footer>
          </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
