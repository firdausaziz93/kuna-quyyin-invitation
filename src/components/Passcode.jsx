import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function Passcode({ onUnlock }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  const handleFingerprint = () => {
    if (isScanning || isVerified) return
    
    setIsScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsVerified(true)
          // Auto unlock selepas verified
          setTimeout(() => onUnlock(true), 1500)
          return 100
        }
        return prev + 1
      })
    }, 30)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-navy via-navy to-deep-purple flex items-center justify-center overflow-hidden"
      >
        {/* Background stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Main Card - Single Screen */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 w-full max-w-sm px-6"
        >
          <motion.div 
            className="glass-card glass-refraction p-8 relative overflow-hidden"
            animate={isVerified ? {
              boxShadow: ['0 0 0 0 rgba(74,222,128,0.3)', '0 0 60px 20px rgba(74,222,128,0.1)', '0 0 0 0 rgba(74,222,128,0)']
            } : {}}
            transition={{ duration: 1.5 }}
          >
            {/* Rotating gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1) 60deg, rgba(255,255,255,0.15) 120deg, transparent 180deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-dm font-light text-xs text-slate-400 tracking-[0.3em] uppercase mb-3">
                  Walimatul Urus
                </p>
                
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 glass-card glass-refraction flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                >
                  <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.div>

                <motion.h1
                  className="font-playfair font-light text-3xl text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Fatin & Azrien
                </motion.h1>

                <motion.div
                  className="w-12 h-px bg-white/30 mx-auto my-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />

                <motion.p
                  className="font-dm font-light text-sm text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  15 Januari 2027
                </motion.p>

                <motion.p
                  className="font-dm font-light text-xs text-slate-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Anda dijemput ke majlis kami
                </motion.p>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="w-full h-px bg-white/10 my-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />

              {/* Fingerprint Section */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.p
                  className="font-dm font-light text-xs text-slate-500 mb-4 tracking-wider uppercase"
                >
                  {isVerified ? 'Akses Diberikan' : 'Sentuh untuk buka undangan'}
                </motion.p>

                {/* Fingerprint Button */}
                <motion.button
                  onClick={handleFingerprint}
                  disabled={isScanning || isVerified}
                  className="relative w-24 h-24 glass-card glass-refraction flex items-center justify-center cursor-pointer group"
                  style={{ borderRadius: '50%' }}
                  whileHover={!isScanning && !isVerified ? { scale: 1.08 } : {}}
                  whileTap={!isScanning && !isVerified ? { scale: 0.95 } : {}}
                  animate={isVerified ? {
                    boxShadow: ['0 0 0 0 rgba(74,222,128,0.4)', '0 0 0 25px rgba(74,222,128,0)', '0 0 0 0 rgba(74,222,128,0.4)']
                  } : isScanning ? {
                    boxShadow: ['0 0 0 0 rgba(255,255,255,0.2)', '0 0 0 15px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.2)']
                  } : {}}
                  transition={{ duration: 1.2, repeat: isScanning && !isVerified ? Infinity : 0 }}
                >
                  {/* Progress Circle */}
                  {isScanning && !isVerified && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="rgba(74,222,128,0.8)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={276}
                        strokeDashoffset={276 - (276 * scanProgress) / 100}
                      />
                    </svg>
                  )}

                  {/* Icon */}
                  {isVerified ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.svg
                      className={`w-10 h-10 transition-colors ${isScanning ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
                    >
                      <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.35.43.22.68-.09.18-.26.27-.45.27zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.48.38z"/>
                    </motion.svg>
                  )}

                  {/* Scanning line effect */}
                  {isScanning && !isVerified && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      style={{ borderRadius: '50%' }}
                    >
                      <motion.div
                        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
                        animate={{ y: [-35, 35, -35] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </motion.button>

                {/* Status Text */}
                <motion.p
                  className="font-dm font-light text-sm mt-4"
                  animate={{ color: isVerified ? 'rgb(74,222,128)' : isScanning ? 'rgb(255,255,255)' : 'rgb(148,163,184)' }}
                >
                  {isVerified ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      ✓ Disahkan
                    </motion.span>
                  ) : isScanning ? (
                    <span>Mengimbas... {scanProgress}%</span>
                  ) : (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Tap ikon cap jari
                    </motion.span>
                  )}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-slate-600 font-dm font-light text-xs mt-6"
          >
            Pengesahan biometrik untuk akses eksklusif
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Passcode
