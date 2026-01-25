import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import azrienImg from '../img/azrien.jpeg'
import fatinImg from '../img/fatin.png'

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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const countdownItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Minit', value: timeLeft.minutes },
    { label: 'Saat', value: timeLeft.seconds }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <motion.div
          variants={itemVariants}
          className="glass-card glass-refraction p-8 md:p-16 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="font-dm font-medium text-lg md:text-xl text-white mb-4"
          >
            JEMPUTAN WALIMATUL URUS
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-dm font-light text-base md:text-lg text-slate-300 mb-4"
          >
            Assalamualaikum..
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-dm font-light text-lg md:text-2xl text-white/90 mb-6 leading-relaxed"
            style={{ direction: 'rtl' }}
          >
            بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيمِ
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-white/20 mx-auto mb-6"
          />

          <motion.p
            variants={itemVariants}
            className="font-playfair font-medium text-xl md:text-2xl text-white mb-4"
          >
            MOHD YUSRI BIN JOHAN
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-dm font-light text-base text-slate-400 mb-2"
          >
            &
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-playfair font-medium text-xl md:text-2xl text-white mb-6"
          >
            NORUL FATEHAH BINTI ABDUL WAHAB
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-dm font-light text-sm md:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed"
          >
            dengan setulus ikhlas untuk menjemput Ahli Keluarga / Saudara Mara / Jiran Tetangga / Sahabat Handai Serta Rakan-Rakan ke Majlis Pernikahan Puteri / Adik kesayangan kami iaitu :
          </motion.p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 overflow-hidden"
                style={{ borderRadius: '9999px' }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={azrienImg} 
                  alt="Azrien" 
                  className="w-full h-full object-cover relative z-10"
                  style={{ borderRadius: '9999px' }}
                />
                <div className="absolute inset-0 border-2 border-white/30 z-20" style={{ borderRadius: '9999px' }} />
              </motion.div>
              <h1 className="font-playfair font-light text-3xl md:text-5xl lg:text-6xl text-white mb-2">
                Azrien
              </h1>
              <p className="font-dm font-light text-base md:text-lg text-slate-400">
                Bin akan Dikemaskini
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-row md:flex-col items-center gap-4"
            >
              <div className="w-16 md:w-px md:h-16 h-px bg-gradient-to-r md:bg-gradient-to-b from-transparent to-white/30" />
              <span className="font-playfair font-light text-2xl md:text-3xl text-white/80">&</span>
              <div className="w-16 md:w-px md:h-16 h-px bg-gradient-to-l md:bg-gradient-to-t from-transparent to-white/30" />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 overflow-hidden"
                style={{ borderRadius: '9999px' }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={fatinImg} 
                  alt="Fatin" 
                  className="w-full h-full object-cover relative z-10"
                  style={{ borderRadius: '9999px' }}
                />
                <div className="absolute inset-0 border-2 border-white/30 z-20" style={{ borderRadius: '9999px' }} />
              </motion.div>
              <h1 className="font-playfair font-light text-3xl md:text-5xl lg:text-6xl text-white mb-2">
                Fatin
              </h1>
              <p className="font-dm font-light text-base md:text-lg text-slate-400">
                Binti Mohd Yusri
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"
          />

          <motion.p
            variants={itemVariants}
            className="font-dm font-light text-base md:text-lg text-slate-300 mb-8"
          >
            Dengan penuh kesyukuran, kami menjemput Dato/Datin/Tuan/Puan/Encik/Cik
            ke majlis perkahwinan kami
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto"
          >
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass-card glass-refraction p-3 md:p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  key={item.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="block font-playfair font-semibold text-2xl md:text-4xl text-white"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>
                <span className="font-dm font-light text-xs md:text-sm text-slate-400 mt-1 block">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
