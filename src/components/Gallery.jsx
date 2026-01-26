import { motion } from 'framer-motion'

function Gallery() {
  const photos = [
    { id: 1, span: 'col-span-1 row-span-2' },
    { id: 2, span: 'col-span-1 row-span-1' },
    { id: 3, span: 'col-span-1 row-span-1' },
    { id: 4, span: 'col-span-1 row-span-1' },
    { id: 5, span: 'col-span-1 row-span-2' },
    { id: 6, span: 'col-span-1 row-span-1' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="py-24 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="label-caps text-champagne mb-4">Kenangan</p>
          <h2 className="font-playfair text-3xl md:text-4xl text-gray-800">
            Galeri Kami
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className={`relative group cursor-pointer ${photo.span}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card h-full overflow-hidden">
                <div className={`relative w-full ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'} bg-gray-100`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 glass-card flex items-center justify-center rounded-full">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-dm text-xs text-gray-400">
                        Foto {photo.id}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  
                  <div className="absolute inset-0 border border-gray-200 group-hover:border-champagne/40 transition-colors duration-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-dm text-center text-xs text-white/30 mt-10"
        >
          Gambar akan dikemaskini
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Gallery
