import { motion } from 'framer-motion'
import { useState } from 'react'

function RSVP() {
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'hadir',
    bilangan: '1'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    
    const statusText = formData.kehadiran === 'hadir' ? 'akan hadir' : 'tidak dapat hadir'
    const bilanganText = formData.kehadiran === 'hadir' ? ` bersama ${formData.bilangan} orang` : ''
    
    const message = encodeURIComponent(
      `Assalamualaikum dan Salam Sejahtera,\n\n` +
      `Saya ${formData.nama} ingin memaklumkan bahawa saya *${statusText}*${bilanganText} ke Majlis Perkahwinan Azrien & Fatin pada 15 Januari 2027.\n\n` +
      `Terima kasih.`
    )
    
    window.open(`https://wa.me/60123456789?text=${message}`, '_blank')
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-xl"
      >
        <motion.h2
          variants={itemVariants}
          className="font-playfair font-light text-3xl md:text-5xl text-center text-white mb-4"
        >
          RSVP
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="font-dm font-light text-center text-slate-400 mb-4"
        >
          Sila maklumkan kehadiran anda
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="w-16 h-px bg-white/30 mx-auto mb-12"
        />

        <motion.form
          variants={itemVariants}
          onSubmit={handleWhatsAppSubmit}
          className="glass-card glass-refraction p-6 md:p-10 space-y-6"
        >
          <div>
            <label 
              htmlFor="nama" 
              className="block font-dm font-light text-sm text-slate-300 mb-3"
            >
              Nama Penuh
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama anda"
              className="w-full px-4 py-4 bg-white/5 border border-white/10 text-white font-dm font-light placeholder-slate-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>

          <div>
            <label 
              className="block font-dm font-light text-sm text-slate-300 mb-3"
            >
              Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.label
                className={`glass-card cursor-pointer p-4 text-center transition-all ${
                  formData.kehadiran === 'hadir' 
                    ? 'bg-white/20 border-white/40' 
                    : 'bg-white/5 border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="kehadiran"
                  value="hadir"
                  checked={formData.kehadiran === 'hadir'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="font-dm font-medium text-white">Hadir</span>
              </motion.label>

              <motion.label
                className={`glass-card cursor-pointer p-4 text-center transition-all ${
                  formData.kehadiran === 'tidak' 
                    ? 'bg-white/20 border-white/40' 
                    : 'bg-white/5 border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="kehadiran"
                  value="tidak"
                  checked={formData.kehadiran === 'tidak'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="font-dm font-medium text-white">Tidak Hadir</span>
              </motion.label>
            </div>
          </div>

          {formData.kehadiran === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label 
                htmlFor="bilangan" 
                className="block font-dm font-light text-sm text-slate-300 mb-3"
              >
                Bilangan Kehadiran
              </label>
              <select
                id="bilangan"
                name="bilangan"
                value={formData.bilangan}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 text-white font-dm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="bg-navy text-white">
                    {num} orang
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="glass-button w-full py-4 font-dm font-medium text-base tracking-wide flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hantar via WhatsApp
          </motion.button>
        </motion.form>

        <motion.p
          variants={itemVariants}
          className="font-dm font-light text-center text-sm text-slate-500 mt-6"
        >
          Maklum balas anda amat kami hargai
        </motion.p>
      </motion.div>
    </section>
  )
}

export default RSVP
