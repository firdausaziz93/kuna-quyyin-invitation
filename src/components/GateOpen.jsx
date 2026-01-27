import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GateOpen({ onAnimationComplete }) {
  // SVG Floral (Sama seperti Hero.jsx untuk konsistensi)
  const FloralPattern = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      viewBox="0 0 80 80"
      fill="currentColor"
    >
      <ellipse cx="40" cy="40" rx="8" ry="16" opacity="0.8" />
      <ellipse cx="40" cy="40" rx="16" ry="8" opacity="0.8" />
      <ellipse cx="40" cy="40" rx="8" ry="16" transform="rotate(45 40 40)" opacity="0.6" />
      <ellipse cx="40" cy="40" rx="16" ry="8" transform="rotate(45 40 40)" opacity="0.6" />
      <circle cx="40" cy="40" r="5" fill="#1e40af" />
      <path d="M15 40 Q5 35 10 25 Q20 30 15 40 Z" opacity="0.7" />
      <path d="M15 40 Q5 45 10 55 Q20 50 15 40 Z" opacity="0.7" />
    </svg>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 2.0 } }}
      style={{ perspective: 1500 }} // Perlu perspective untuk 3D flip effect
    >
      {/* KIRI - Panel Pintu */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -110 }}
        transition={{ 
          duration: 2.5, 
          ease: "easeInOut", // Lebih natural untuk bukaan pintu/buku
          delay: 1.5 
        }}
        style={{ transformOrigin: 'left' }}
        className="w-1/2 h-full bg-gradient-to-br from-blue-50 to-white backdrop-blur-3xl border-r border-blue-200/50 shadow-2xl relative flex items-center justify-end pr-4 z-20"
      >
        {/* Hiasan Bunga Tengah Kiri */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-30">
           <FloralPattern className="w-48 h-48 text-blue-600" />
        </div>
        {/* Hiasan Bucu */}
        <FloralPattern className="absolute top-10 left-10 w-24 h-24 text-blue-400 opacity-20" />
        <FloralPattern className="absolute bottom-10 left-10 w-24 h-24 text-blue-400 opacity-20" />
      </motion.div>

      {/* KANAN - Panel Pintu */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 110 }}
        transition={{ 
          duration: 2.5, 
          ease: "easeInOut",
          delay: 1.5 
        }}
        style={{ transformOrigin: 'right' }}
        onAnimationComplete={() => {
            // Panggil callback bila animasi TAMAT
            if(onAnimationComplete) onAnimationComplete();
        }}
        className="w-1/2 h-full bg-gradient-to-bl from-blue-50 to-white backdrop-blur-3xl border-l border-blue-200/50 shadow-2xl relative flex items-center justify-start pl-4 z-20"
      >
         {/* Hiasan Bunga Tengah Kanan (Mirror) */}
         <div className="absolute top-1/2 -translate-y-1/2 left-4 opacity-30 scale-x-[-1]">
           <FloralPattern className="w-48 h-48 text-blue-600" />
        </div>
        {/* Hiasan Bucu */}
        <FloralPattern className="absolute top-10 right-10 w-24 h-24 text-blue-400 opacity-20 scale-x-[-1]" />
        <FloralPattern className="absolute bottom-10 right-10 w-24 h-24 text-blue-400 opacity-20 scale-x-[-1]" />
      </motion.div>

      {/* Tengah - Teks Selamat Datang (Akan Fade Out) */}
      <motion.div 
        className="absolute z-50 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 p-8 rounded-full shadow-xl border border-blue-100 backdrop-blur-sm"
        >
          <p className="font-playfair text-3xl text-gray-800 italic mb-2">Ahlan Wasahlan</p>
          <div className="w-16 h-0.5 bg-blue-300 mx-auto my-3" />
          <p className="text-xs font-dm tracking-[0.3em] text-blue-600 uppercase">Selamat Datang</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
