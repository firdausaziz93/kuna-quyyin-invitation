import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import floralBg from '../img/floral-blue.png'

function Passcode({ onUnlock, onStartInteraction }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  const handleFingerprint = () => {
    if (isScanning || isVerified) return
    
    // Trigger audio unlock immediately on user interaction
    if (onStartInteraction) onStartInteraction()

    setIsScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsVerified(true)
          setTimeout(() => onUnlock(true), 1200)
          return 100
        }
        return prev + 2
      })
    }, 30)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-base flex items-center justify-center overflow-hidden"
    >
      {/* Floral Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url(${floralBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-[#e8e4df] -top-60 left-1/4" />
        <div className="ambient-blob w-[400px] h-[400px] bg-[#f0ece7] bottom-40 right-1/4" />
      </div>

      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="star-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        <motion.div 
          className="glass-card arch-card p-10 pb-12"
          animate={isVerified ? {
            boxShadow: ['0 20px 50px -10px rgba(0,0,0,0.5)', '0 20px 80px -10px rgba(212,190,159,0.15)', '0 20px 50px -10px rgba(0,0,0,0.5)']
          } : {}}
          transition={{ duration: 1.5 }}
        >
          <div className="relative z-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="label-caps text-champagne mb-6">
                Walimatul Urus
              </p>

              <div className="line-ornament mb-8">
                <span className="w-1 h-1 bg-champagne/40 rounded-full" />
              </div>
              
              <h1 className="font-playfair text-3xl md:text-4xl text-gray-800 mb-1 font-normal">
                Fatin
              </h1>
              <p className="font-playfair text-xl text-gray-500 italic my-3">&</p>
              <h1 className="font-playfair text-3xl md:text-4xl text-gray-800 font-normal">
                Azrien
              </h1>

              <div className="decorative-line my-8" />

              <p className="font-dm text-sm text-gray-500 tracking-wide">
                06 Jun 2026
              </p>
              <p className="font-dm text-xs text-gray-400 mt-2">
                Anda dijemput ke majlis kami
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="label-caps mb-5">
                {isVerified ? 'Akses Diberikan' : 'Sentuh untuk buka'}
              </p>

              <motion.button
                onClick={handleFingerprint}
                disabled={isScanning || isVerified}
                className="relative w-20 h-20 glass-card flex items-center justify-center cursor-pointer group"
                style={{ borderRadius: '50%' }}
                whileHover={!isScanning && !isVerified ? { scale: 1.05 } : {}}
                whileTap={!isScanning && !isVerified ? { scale: 0.95 } : {}}
              >
                {isScanning && !isVerified && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="2"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="rgba(212,190,159,0.8)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={226}
                      strokeDashoffset={226 - (226 * scanProgress) / 100}
                    />
                  </svg>
                )}

                {isVerified ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg className="w-8 h-8 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </svg>
                  </motion.div>
                ) : (
                  <svg
                    className={`w-8 h-8 transition-colors duration-300 ${isScanning ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.35.43.22.68-.09.18-.26.27-.45.27zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.48.38z"/>
                  </svg>
                )}
              </motion.button>

              <motion.p
                className="font-dm text-xs mt-4 tracking-wide"
                animate={{ 
                  color: isVerified ? 'rgb(212,190,159)' : isScanning ? 'rgba(55,65,81,0.9)' : 'rgba(107,114,128,0.8)' 
                }}
              >
                {isVerified ? 'Disahkan' : isScanning ? `${scanProgress}%` : 'Tap untuk akses'}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Passcode
