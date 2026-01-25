import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

function Passcode({ onUnlock }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [unlockStage, setUnlockStage] = useState(0)
  const [showCard, setShowCard] = useState(false)

  const handleFingerprint = () => {
    if (isScanning || isUnlocking) return
    
    setIsScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsVerified(true)
          setTimeout(() => startUnlockSequence(), 1200)
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  const startUnlockSequence = () => {
    setIsUnlocking(true)
    
    setTimeout(() => setUnlockStage(1), 800)
    setTimeout(() => setUnlockStage(2), 2500)
    setTimeout(() => setUnlockStage(3), 4200)
    setTimeout(() => setUnlockStage(4), 6000)
    setTimeout(() => setShowCard(true), 7500)
    setTimeout(() => setUnlockStage(5), 9000)
    // Berhenti di sini - user perlu swipe untuk buka undangan
  }

  const handleSwipeUp = () => {
    if (unlockStage >= 5 && showCard) {
      onUnlock(true) // Pass true to signal music should start
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-navy via-navy to-deep-purple flex items-center justify-center overflow-hidden"
      >
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

        <AnimatePresence mode="wait">
          {!isUnlocking ? (
            <motion.div
              key="fingerprint"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: -100 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 w-full max-w-sm px-6"
            >
              <motion.div className="glass-card glass-refraction p-8 md:p-10">
                <div className="text-center mb-8">
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-dm font-light text-sm text-slate-400 tracking-[0.2em] uppercase mb-4"
                  >
                    Kad Jemputan Eksklusif
                  </motion.p>
                  
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-playfair font-light text-2xl text-white mb-2"
                  >
                    Fatin & Azrien
                  </motion.h2>
                  
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-16 h-px bg-white/30 mx-auto mt-4"
                  />
                </div>

                <motion.div
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={handleFingerprint}
                    disabled={isScanning || isVerified}
                    className="relative w-32 h-32 glass-card glass-refraction flex items-center justify-center cursor-pointer group"
                    style={{ borderRadius: '50%' }}
                    whileHover={!isScanning && !isVerified ? { scale: 1.05 } : {}}
                    whileTap={!isScanning && !isVerified ? { scale: 0.95 } : {}}
                    animate={isVerified ? {
                      boxShadow: ['0 0 0 0 rgba(74,222,128,0.4)', '0 0 0 30px rgba(74,222,128,0)', '0 0 0 0 rgba(74,222,128,0.4)']
                    } : isScanning ? {
                      boxShadow: ['0 0 0 0 rgba(255,255,255,0.2)', '0 0 0 20px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0.2)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: isScanning && !isVerified ? Infinity : 0 }}
                  >
                    {isScanning && !isVerified && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="4"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke="rgba(74,222,128,0.8)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={377}
                          strokeDashoffset={377 - (377 * scanProgress) / 100}
                        />
                      </svg>
                    )}

                    {isVerified ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className={`w-16 h-16 transition-colors ${isScanning ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
                      >
                        <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.35.43.22.68-.09.18-.26.27-.45.27zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.48.38z"/>
                      </motion.svg>
                    )}

                    {isScanning && !isVerified && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
                          animate={{ y: [-50, 50, -50] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-dm font-light text-sm text-slate-400 mt-6 text-center"
                  >
                    {isVerified ? (
                      <span className="text-green-400">Cap jari disahkan</span>
                    ) : isScanning ? (
                      <span>Mengimbas cap jari...</span>
                    ) : (
                      <span>Sentuh untuk membuka undangan</span>
                    )}
                  </motion.p>

                  {isScanning && !isVerified && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 w-full"
                    >
                      <div className="h-1 bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-400/50 to-green-400"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <p className="text-center text-xs text-slate-500 mt-2">{scanProgress}%</p>
                    </motion.div>
                  )}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-slate-500 font-dm font-light text-xs mt-8"
                >
                  Pengesahan biometrik untuk akses eksklusif
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="vault"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 w-full max-w-lg px-6"
            >
              <div className="relative aspect-[3/4] max-w-sm mx-auto" style={{ perspective: '1500px' }}>
                <motion.div
                  className="absolute inset-0 glass-card glass-refraction overflow-hidden"
                  style={{ borderRadius: '20px' }}
                  animate={unlockStage >= 4 ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <div className="absolute inset-3 border-4 border-white/20" style={{ borderRadius: '14px' }} />
                  <div className="absolute inset-6 border-2 border-white/10" style={{ borderRadius: '10px' }} />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="glass-card w-6 h-6 flex items-center justify-center"
                        style={{ borderRadius: '50%' }}
                        initial={{ scale: 0 }}
                        animate={unlockStage >= 1 ? { scale: 1 } : {}}
                        transition={{ delay: i * 0.3, duration: 0.6, ease: "easeOut" }}
                      >
                        <motion.div
                          className="w-2 h-2"
                          style={{ borderRadius: '50%' }}
                          animate={unlockStage >= 2 ? { backgroundColor: 'rgba(74,222,128,0.8)' } : { backgroundColor: 'rgba(255,255,255,0.3)' }}
                          transition={{ delay: i * 0.4, duration: 0.8 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={unlockStage >= 1 ? { rotate: [0, 90, 180, 270, 360] } : {}}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    <div className="w-28 h-28 glass-card glass-refraction flex items-center justify-center" style={{ borderRadius: '50%' }}>
                      <div className="w-20 h-20 glass-card flex items-center justify-center" style={{ borderRadius: '50%' }}>
                        <motion.div 
                          className="w-12 h-12 glass-card flex items-center justify-center" 
                          style={{ borderRadius: '50%' }}
                          animate={unlockStage >= 3 ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.8 }}
                        >
                          <motion.div
                            className="w-4 h-4"
                            style={{ borderRadius: '50%' }}
                            animate={unlockStage >= 2 ? { backgroundColor: 'rgba(74,222,128,0.8)' } : { backgroundColor: 'rgba(255,255,255,0.5)' }}
                            transition={{ duration: 0.8 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-20 glass-card"
                    animate={unlockStage >= 3 ? { x: [0, 10, 0], rotate: [0, 5, 0] } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />

                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute left-5 glass-card w-6 h-2"
                      style={{ top: `${25 + i * 15}%` }}
                      animate={unlockStage >= 2 ? { x: [-3, 0] } : {}}
                      transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute right-0 top-0 h-full w-1.5"
                        initial={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        animate={unlockStage >= 2 ? { backgroundColor: 'rgba(74,222,128,0.6)' } : {}}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                        style={{ borderRadius: '2px' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <AnimatePresence>
                  {unlockStage >= 4 && (
                    <>
                      <motion.div
                        className="absolute inset-0"
                        style={{ 
                          transformStyle: 'preserve-3d',
                          zIndex: 20
                        }}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: -160 }}
                        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <motion.div
                          className="absolute inset-0 glass-card glass-refraction"
                          style={{ 
                            borderRadius: '20px',
                            transformOrigin: 'left center',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="absolute inset-3 border-4 border-white/20" style={{ borderRadius: '14px' }} />
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-28 h-28 glass-card glass-refraction flex items-center justify-center" style={{ borderRadius: '50%' }}>
                              <div className="w-20 h-20 glass-card flex items-center justify-center" style={{ borderRadius: '50%' }}>
                                <div className="w-12 h-12 glass-card flex items-center justify-center" style={{ borderRadius: '50%' }}>
                                  <div className="w-4 h-4 bg-green-400/80" style={{ borderRadius: '50%' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>

                      {showCard && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                          initial={{ opacity: 0, scale: 0.3, y: 80 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.3
                          }}
                          style={{ zIndex: 30 }}
                          drag="y"
                          dragConstraints={{ top: 0, bottom: 0 }}
                          dragElastic={0.2}
                          onDragEnd={(event, info) => {
                            if (info.offset.y < -50 || info.velocity.y < -200) {
                              handleSwipeUp()
                            }
                          }}
                          whileDrag={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="w-full h-full glass-card glass-refraction p-6 flex flex-col items-center justify-center relative overflow-hidden"
                            style={{ borderRadius: '20px' }}
                            initial={{ rotateX: 20 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-30"
                              style={{
                                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1) 60deg, rgba(255,255,255,0.2) 120deg, transparent 180deg)',
                              }}
                              animate={{ rotate: 360 }}
                              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                              className="text-center relative z-10"
                            >
                              <motion.p
                                className="font-dm font-light text-xs text-slate-400 tracking-[0.3em] uppercase mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                              >
                                Walimatul Urus
                              </motion.p>

                              <motion.div
                                className="w-20 h-20 mx-auto mb-4 glass-card glass-refraction flex items-center justify-center"
                                style={{ borderRadius: '50%' }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 120 }}
                              >
                                <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </motion.div>

                              <motion.h1
                                className="font-playfair font-light text-2xl md:text-3xl text-white mb-2"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                              >
                                Fatin & Azrien
                              </motion.h1>

                              <motion.div
                                className="w-12 h-px bg-white/30 mx-auto my-4"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                              />

                              <motion.p
                                className="font-dm font-light text-sm text-slate-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.1, duration: 0.6 }}
                              >
                                15 Januari 2027
                              </motion.p>

                              <motion.p
                                className="font-dm font-light text-xs text-slate-400 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.4, duration: 0.6 }}
                              >
                                Anda dijemput ke majlis kami
                              </motion.p>
                            </motion.div>

                            <motion.div
                              className="absolute bottom-6 left-0 right-0 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 2.8, duration: 0.6 }}
                            >
                              <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <svg className="w-6 h-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                              </motion.div>
                              <motion.p 
                                className="font-dm font-light text-sm text-white/70 mt-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Swipe ke atas untuk buka
                              </motion.p>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>

                {unlockStage >= 1 && unlockStage < 4 && (
                  <div className="absolute -inset-4">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/60"
                        style={{
                          left: '50%',
                          top: '50%',
                          borderRadius: '50%'
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: [0, Math.cos(i * 30 * Math.PI / 180) * 120],
                          y: [0, Math.sin(i * 30 * Math.PI / 180) * 120],
                        }}
                        transition={{
                          duration: 1.8,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <p className="font-dm font-light text-slate-400">
                  {unlockStage === 1 && "Membuka peti..."}
                  {unlockStage === 2 && "Mengesahkan akses..."}
                  {unlockStage === 3 && "Melepaskan kunci..."}
                  {unlockStage === 4 && "Membuka undangan..."}
                  {unlockStage >= 5 && "Selamat datang!"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default Passcode