import { motion } from 'framer-motion'

function Details() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const eventDetails = [
    {
      title: 'Tarikh',
      content: '15 Januari 2027',
      subtitle: 'Jumaat'
    },
    {
      title: 'Masa',
      content: '11:00 Pagi',
      subtitle: 'Jamuan Makan: 12:00 Tengahari'
    },
    {
      title: 'Lokasi',
      content: 'Dewan Seri Melaka',
      subtitle: 'Jalan Hang Tuah, 75000 Melaka'
    }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl"
      >
        <motion.h2
          variants={itemVariants}
          className="font-playfair font-light text-3xl md:text-5xl text-center text-white mb-4"
        >
          Butiran Majlis
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="w-16 h-px bg-white/30 mx-auto mb-16"
        />

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              variants={itemVariants}
              className="glass-card glass-refraction p-6 md:p-8 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-dm font-light text-sm text-slate-400 tracking-[0.2em] uppercase mb-4">
                {detail.title}
              </h3>
              <p className="font-playfair font-medium text-xl md:text-2xl text-white mb-2">
                {detail.content}
              </p>
              <p className="font-dm font-light text-sm text-slate-400">
                {detail.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="glass-card glass-refraction p-4 md:p-6 overflow-hidden"
        >
          <div className="aspect-video w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.9975742548497!2d102.24691731475695!3d2.189686998069868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1ed1ee tried8c3%3A0x8c4b4d4d4d4d4d4d!2sMelaka%2C%20Malaysia!5e0!3m2!1sen!2smy!4v1620000000000!5m2!1sen!2smy"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Majlis"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/10" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <motion.a
            href="https://www.google.com/maps/search/Dewan+Seri+Melaka+Melaka"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button inline-flex items-center gap-3 px-8 py-4 font-dm font-medium text-sm tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Buka di Google Maps
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card glass-refraction p-6 md:p-8 mt-12 text-center"
        >
          <h3 className="font-playfair font-light text-xl md:text-2xl text-white mb-4">
            Atur Cara Majlis
          </h3>
          <div className="space-y-4 font-dm font-light text-slate-300">
            <div className="flex justify-between items-center max-w-sm mx-auto">
              <span>Ketibaan Tetamu</span>
              <span className="text-white">11:00 PG</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex justify-between items-center max-w-sm mx-auto">
              <span>Ketibaan Pengantin</span>
              <span className="text-white">12:00 TH</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex justify-between items-center max-w-sm mx-auto">
              <span>Jamuan Makan</span>
              <span className="text-white">12:30 TH</span>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="flex justify-between items-center max-w-sm mx-auto">
              <span>Majlis Bersurai</span>
              <span className="text-white">4:00 PTG</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Details
