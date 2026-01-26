import { motion } from 'framer-motion'

function Details() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const eventDetails = [
    {
      label: 'Tarikh',
      value: '15 Januari 2027',
      sub: 'Jumaat'
    },
    {
      label: 'Masa',
      value: '11:00 Pagi',
      sub: 'Jamuan: 12:00 Tengahari'
    },
    {
      label: 'Lokasi',
      value: 'Dewan Seri Melaka',
      sub: 'Jalan Hang Tuah, 75000 Melaka'
    }
  ]

  const aturCara = [
    { time: '11:00 PG', event: 'Ketibaan Tetamu' },
    { time: '12:00 TH', event: 'Ketibaan Pengantin' },
    { time: '12:30 TH', event: 'Jamuan Makan' },
    { time: '4:00 PTG', event: 'Majlis Bersurai' }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="label-caps text-champagne mb-4">Butiran</p>
          <h2 className="font-playfair text-3xl md:text-4xl text-gray-800">
            Majlis Perkahwinan
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {eventDetails.map((detail) => (
            <motion.div
              key={detail.label}
              variants={itemVariants}
              className="glass-card glass-card-hover p-6 md:p-8 text-center"
            >
              <p className="label-caps text-gray-500 mb-4">{detail.label}</p>
              <p className="font-playfair text-xl md:text-2xl text-gray-800 mb-2">
                {detail.value}
              </p>
              <p className="font-dm text-xs text-gray-500">
                {detail.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="glass-card p-4 md:p-6 mb-8"
        >
          <p className="label-caps text-center mb-4">Lokasi Majlis</p>
          <div className="aspect-video w-full relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.9975742548497!2d102.24691731475695!3d2.189686998069868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1ed1ee8c3%3A0x8c4b4d4d4d4d4d4d!2sMelaka%2C%20Malaysia!5e0!3m2!1sen!2smy!4v1620000000000!5m2!1sen!2smy"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05) brightness(1.0)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Majlis"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 pointer-events-none border border-gray-200" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.a
            href="https://www.google.com/maps/search/Dewan+Seri+Melaka+Melaka"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-champagne inline-flex items-center gap-3 px-8 py-4 font-dm text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Buka di Google Maps
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card p-6 md:p-10"
        >
          <p className="label-caps text-center mb-6">Atur Cara Majlis</p>
          <div className="max-w-md mx-auto space-y-0">
            {aturCara.map((item, index) => (
              <div key={item.event}>
                <div className="flex justify-between items-center py-4">
                  <span className="font-dm text-gray-600 text-sm">{item.event}</span>
                  <span className="font-playfair text-gray-800 text-sm">{item.time}</span>
                </div>
                {index < aturCara.length - 1 && (
                  <div className="decorative-line" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card p-6 md:p-8 mt-8 text-center"
        >
          <p className="label-caps mb-3">Dress Code</p>
          <p className="font-playfair text-xl text-gray-800 mb-2">Formal / Semi-Formal</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-[#d4be9f]" title="Champagne" />
            <div className="w-8 h-8 rounded-full bg-[#8b9a7c]" title="Sage" />
            <div className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-gray-200" title="Off-white" />
          </div>
          <p className="font-dm text-xs text-gray-400 mt-3">Champagne, Sage, Off-white</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Details
