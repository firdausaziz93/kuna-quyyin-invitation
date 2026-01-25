import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function Gallery() {
  const [loadedImages, setLoadedImages] = useState({})

  const photos = [
    { id: 1, aspect: 'portrait', placeholder: 'Foto 1' },
    { id: 2, aspect: 'landscape', placeholder: 'Foto 2' },
    { id: 3, aspect: 'square', placeholder: 'Foto 3' },
    { id: 4, aspect: 'portrait', placeholder: 'Foto 4' },
    { id: 5, aspect: 'landscape', placeholder: 'Foto 5' },
    { id: 6, aspect: 'square', placeholder: 'Foto 6' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const getAspectClass = (aspect) => {
    switch (aspect) {
      case 'portrait':
        return 'aspect-[3/4]'
      case 'landscape':
        return 'aspect-[4/3]'
      case 'square':
      default:
        return 'aspect-square'
    }
  }

  const getGridClass = (index) => {
    const patterns = [
      'md:col-span-1 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ]
    return patterns[index] || ''
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl"
      >
        <motion.h2
          variants={itemVariants}
          className="font-playfair font-light text-3xl md:text-5xl text-center text-white mb-4"
        >
          Galeri Kami
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="w-16 h-px bg-white/30 mx-auto mb-16"
        />

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className={`relative overflow-hidden ${getGridClass(index)}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card glass-refraction h-full group cursor-pointer overflow-hidden">
                <div className={`relative w-full ${getAspectClass(photo.aspect)} bg-white/5`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 glass-card flex items-center justify-center" style={{ borderRadius: '50%' }}>
                        <svg 
                          className="w-6 h-6 text-white/50" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                      </div>
                      <span className="font-dm font-light text-sm text-slate-500">
                        {photo.placeholder}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={false}
                  >
                    <div 
                      className="absolute inset-0 glass-shimmer opacity-30"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1) 90deg, transparent 180deg)',
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-dm font-light text-center text-sm text-slate-500 mt-8"
        >
          Gambar akan dikemaskini
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Gallery
