import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import azrienImg from '../img/azrien-removebg.png'
import fatinImg from '../img/kuna-removebg.png'

function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2027-01-15T11:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const countdownItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Minit', value: timeLeft.minutes },
    { label: 'Saat', value: timeLeft.seconds }
  ]

  return (
    <section className="min-h-screen flex flex-col px-4 py-12">
      {/* Glassy Header with Malay Floral Border */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl mx-auto mb-8"
      >
        <div className="relative px-6 py-2">
          {/* Left Floral Ornament */}
          <svg 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 text-blue-600" 
            viewBox="0 0 80 80" 
            fill="currentColor"
          >
            {/* Main flower */}
            <ellipse cx="40" cy="40" rx="8" ry="16" opacity="0.8" />
            <ellipse cx="40" cy="40" rx="16" ry="8" opacity="0.8" />
            <ellipse cx="40" cy="40" rx="8" ry="16" transform="rotate(45 40 40)" opacity="0.6" />
            <ellipse cx="40" cy="40" rx="16" ry="8" transform="rotate(45 40 40)" opacity="0.6" />
            <circle cx="40" cy="40" r="5" fill="#1e40af" />
            {/* Small petals */}
            <circle cx="40" cy="22" r="3" opacity="0.5" />
            <circle cx="40" cy="58" r="3" opacity="0.5" />
            <circle cx="22" cy="40" r="3" opacity="0.5" />
            <circle cx="58" cy="40" r="3" opacity="0.5" />
            {/* Leaves */}
            <path d="M15 40 Q5 35 10 25 Q20 30 15 40 Z" opacity="0.7" />
            <path d="M15 40 Q5 45 10 55 Q20 50 15 40 Z" opacity="0.7" />
          </svg>

          {/* Right Floral Ornament */}
          <svg 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 text-blue-600 scale-x-[-1]" 
            viewBox="0 0 80 80" 
            fill="currentColor"
          >
            {/* Main flower */}
            <ellipse cx="40" cy="40" rx="8" ry="16" opacity="0.8" />
            <ellipse cx="40" cy="40" rx="16" ry="8" opacity="0.8" />
            <ellipse cx="40" cy="40" rx="8" ry="16" transform="rotate(45 40 40)" opacity="0.6" />
            <ellipse cx="40" cy="40" rx="16" ry="8" transform="rotate(45 40 40)" opacity="0.6" />
            <circle cx="40" cy="40" r="5" fill="#1e40af" />
            {/* Small petals */}
            <circle cx="40" cy="22" r="3" opacity="0.5" />
            <circle cx="40" cy="58" r="3" opacity="0.5" />
            <circle cx="22" cy="40" r="3" opacity="0.5" />
            <circle cx="58" cy="40" r="3" opacity="0.5" />
            {/* Leaves */}
            <path d="M15 40 Q5 35 10 25 Q20 30 15 40 Z" opacity="0.7" />
            <path d="M15 40 Q5 45 10 55 Q20 50 15 40 Z" opacity="0.7" />
          </svg>

          {/* Top decorative line with dots */}
          <div className="absolute top-0 left-20 right-20 flex items-center justify-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-blue-500" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-400 to-blue-500" />
          </div>

          {/* Bottom decorative line with dots */}
          <div className="absolute bottom-0 left-20 right-20 flex items-center justify-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-400 to-blue-500" />
          </div>
          
          {/* Main glassy content */}
          <div className="bg-gradient-to-b from-white/95 to-blue-50/90 backdrop-blur-xl border border-blue-300/50 shadow-xl mx-12 py-5 px-6 text-center rounded-xl relative overflow-hidden">
            {/* Inner decorative border */}
            <div className="absolute inset-2 border border-blue-200/40 rounded-lg pointer-events-none" />
            
            <p className="text-sm md:text-base font-medium tracking-[0.35em] text-gray-700 mb-2 uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Jemputan Walimatul Urus
            </p>
            <p className="text-base md:text-lg text-gray-600 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Assalamualaikum Warahmatullahi Wabarakatuh
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg mx-auto flex-1 flex items-center"
      >
        <motion.div
          variants={itemVariants}
          className="glass-card arch-card p-8 md:p-12 text-center relative w-full"
        >
          <motion.div
            className="absolute inset-0 arch-card"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ zIndex: -1 }}
          />

          <motion.p
            variants={itemVariants}
            className="font-playfair text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed"
            style={{ direction: 'rtl' }}
          >
            بِسۡـــمِ ٱللهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِـيمِ
          </motion.p>

          <div className="line-ornament my-8">
            <span className="w-1.5 h-1.5 bg-champagne/50 rounded-full" />
          </div>

          <motion.p variants={itemVariants} className="label-caps mb-3">
            Dengan segala hormatnya kami
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-playfair text-lg md:text-xl text-gray-800 mb-1"
          >
            Mohd Yusri Bin Johan
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-dm text-gray-400 text-sm mb-1"
          >
            &
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-playfair text-lg md:text-xl text-gray-800 mb-6"
          >
            Norul Fatehah Binti Abdul Wahab
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-dm text-gray-500 text-xs leading-relaxed max-w-sm mx-auto mb-10"
          >
            Dengan penuh kesyukuran menjemput Dato'/Datin/Tuan/Puan/Encik/Cik 
            ke majlis perkahwinan puteri kami
          </motion.p>

          <div className="decorative-line mb-10" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src={fatinImg} 
                    alt="Fatin" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border border-gray-200" />
              </motion.div>
              <h2 className="font-playfair text-2xl md:text-3xl text-gray-800 mb-1">
                Fatin
              </h2>
              <p className="font-dm text-xs text-gray-500">
                Binti Mohd Yusri
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <div className="w-8 h-px bg-gray-300" />
              <span className="font-playfair text-gray-400 text-xl mx-3 italic">&</span>
              <div className="w-8 h-px bg-gray-300" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src={azrienImg} 
                    alt="Azrien" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border border-gray-200" />
              </motion.div>
              <h2 className="font-playfair text-2xl md:text-3xl text-gray-800 mb-1">
                Azrien
              </h2>
              <p className="font-dm text-xs text-gray-500">
                Bin (akan dikemaskini)
              </p>
            </motion.div>
          </div>

          <div className="decorative-line mb-10" />

          <motion.div variants={itemVariants} className="mb-2">
            <p className="label-caps mb-4">Menghitung Hari</p>
            <div className="glass-card inline-flex items-center gap-4 md:gap-6 px-6 py-4">
              {countdownItems.map((item, index) => (
                <div key={item.label} className="text-center">
                  <motion.span
                    key={item.value}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block font-playfair text-2xl md:text-3xl text-gray-800"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.span>
                  <span className="font-dm text-[10px] text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  {index < countdownItems.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">:</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
