import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Simple Obfuscation/Encryption Helpers
const encrypt = (text, key) => {
  if (!key) return text
  const result = text.split('').map((c, i) => 
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('')
  return btoa(result)
}

const decrypt = (encoded, key) => {
  if (!key) return encoded
  try {
    const text = atob(encoded)
    return text.split('').map((c, i) => 
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('')
  } catch (e) { console.error("Decryption failed", e); return encoded }
}

function RSVP() {
  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: 'hadir',
    bilangan: '1'
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  // --- SECURITY CONFIGURATION ---
  // 1. Change this to your own secret key
  const SECRET_KEY = "daushensem"
  
  // 2. Run the app, check Console (F12), copy the generated encrypted string, and paste it here:
  const ENCRYPTED_URL = "DBUBAxtfQVwWDhYIBQdGAgEcAgEBTxYcBUoDEgYfCxJaAEckJRUcDgYWQQEpEDorJj1cDUMlXiAXHTUpCFMSKlFVKBcrGSoGOgsqIyEJOlghLCQ7BlIMHAQuHiUeIVkcFxhQJhUDQzAOKy0gNEIBGRAQ" 

  // const RAW_URL = "https://script.google.com/macros/s/AKfycbw4rAuTXCP8l6V6EynPDl2gY90FdNtNgOxBFOz_5EMQHn7boaCzDkR1yyk5Kqb6CfNCSQ/exec"
  
  // Uses encrypted URL if available, otherwise falls back to raw (auto-decrypts)
  const GOOGLE_SCRIPT_URL = ENCRYPTED_URL ? decrypt(ENCRYPTED_URL, SECRET_KEY) : RAW_URL

  // useEffect(() => {
  //   // Dev helper to generate the encrypted connection string
  //   if (!ENCRYPTED_URL) {
  //     console.log("%c --- ENCRYPTION GENERATOR ---", "color: #bada55; font-weight: bold;")
  //     console.log("Current Key:", SECRET_KEY)
  //     console.log("Encrypted URL:", encrypt(RAW_URL, SECRET_KEY))
  //     console.log("%c ---------------------------", "color: #bada55; font-weight: bold;")
  //   }
  // }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      // Use no-cors mode to avoid CORS errors with Google Apps Script
      // This means we won't get a specific success/fail response (opaque),
      // so we optimistically assume success if the request sends without network error.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
        headers: {
          "Content-Type": "text/plain",
        },
      })

      // With no-cors, we can't check response.ok. We assume it worked if no error was thrown.
      setStatus('success')
      setFormData({ nama: '', kehadiran: 'hadir', bilangan: '1' })

    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-md"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="label-caps text-champagne mb-4">Kehadiran</p>
          <h2 className="font-playfair text-3xl md:text-4xl text-gray-800 mb-3">
            RSVP
          </h2>
          <p className="font-dm text-gray-500 text-sm">
            Sila maklumkan kehadiran anda
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-playfair text-2xl text-gray-800 mb-2">Terima Kasih!</h3>
            <p className="font-dm text-gray-600 mb-6">RSVP anda telah berjaya direkodkan.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-sm font-dm text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800 transition-colors"
            >
              Hantar RSVP lain
            </button>
          </motion.div>
        ) : (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-10 space-y-6"
          >
            <div>
              <label htmlFor="nama" className="label-caps block mb-3">
                Nama Penuh
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                placeholder="Masukkan nama anda"
                className="input-elegant w-full px-4 py-4 font-dm text-sm"
              />
            </div>

            <div>
              <label className="label-caps block mb-3">Kehadiran</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.label
                  className={`cursor-pointer p-4 text-center transition-all rounded-lg border ${
                    formData.kehadiran === 'hadir' 
                      ? 'bg-gray-800 border-gray-800 shadow-lg' 
                      : 'glass-card bg-white/50 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="radio"
                    name="kehadiran"
                    value="hadir"
                    checked={formData.kehadiran === 'hadir'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`font-dm text-sm font-medium ${formData.kehadiran === 'hadir' ? 'text-white' : 'text-gray-700'}`}>Hadir</span>
                </motion.label>

                <motion.label
                  className={`cursor-pointer p-4 text-center transition-all rounded-lg border ${
                    formData.kehadiran === 'tidak' 
                      ? 'bg-gray-800 border-gray-800 shadow-lg' 
                      : 'glass-card bg-white/50 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="radio"
                    name="kehadiran"
                    value="tidak"
                    checked={formData.kehadiran === 'tidak'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`font-dm text-sm font-medium ${formData.kehadiran === 'tidak' ? 'text-white' : 'text-gray-700'}`}>Tidak Hadir</span>
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
                <label htmlFor="bilangan" className="label-caps block mb-3">
                  Bilangan Kehadiran
                </label>
                <select
                  id="bilangan"
                  name="bilangan"
                  value={formData.bilangan}
                  onChange={handleChange}
                  className="input-elegant w-full px-4 py-4 font-dm text-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.2em 1.2em'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num} className="bg-white text-gray-800">
                      {num} orang
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gray-800 text-white font-dm tracking-widest uppercase text-xs py-5 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {status === 'submitting' ? 'Sedang Menghantar...' : 'Hantar RSVP'}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-xs text-center font-dm mt-2">
                Ralat semasa menghantar. Sila cuba lagi.
              </p>
            )}
          </motion.form>
        )}

        <motion.p
          variants={itemVariants}
          className="font-dm text-center text-xs text-gray-400 mt-6"
        >
          Maklum balas anda amat kami hargai
        </motion.p>
      </motion.div>
    </section>
  )
}

export default RSVP
