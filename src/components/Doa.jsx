import { motion } from "framer-motion";

function Doa() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-2xl mx-auto"
      >
        {/* Section Label */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="font-dm text-xs tracking-[0.25em] uppercase text-gray-400 mb-3">
            Doa &amp; Ucapan
          </p>
          <div className="decorative-line max-w-[60px] mx-auto" />
        </motion.div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl px-8 py-10 text-center relative overflow-hidden"
        >
          {/* Subtle gold shimmer top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4be9f] to-transparent opacity-60" />

          {/* Bismillah */}
          <motion.p
            variants={itemVariants}
            className="font-playfair text-2xl sm:text-3xl text-gray-700 leading-relaxed mb-6 tracking-wide"
            style={{ fontStyle: "italic" }}
          >
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>

          {/* Divider ornament */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c4a882]" />
            <svg className="w-4 h-4 text-[#c4a882]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-.01z" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c4a882]" />
          </motion.div>

          {/* Doa text */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            <p className="font-dm text-sm sm:text-base text-gray-600 leading-loose italic">
              "Ya Allah,
            </p>
            <p className="font-dm text-sm sm:text-base text-gray-600 leading-loose">
              Berkatilah majlis yang diadakan ini, jadikanlah pasangan ini
              bahagia dan berkekalan hingga ke syurga dan kurniakanlah kepada
              mereka zuriat yang sempurna, beriman dan beramal soleh.
            </p>
            <p className="font-dm text-sm sm:text-base text-gray-600 leading-loose italic">
              Sesungguhnya Engkau Maha Berkuasa atas segala sesuatu."
            </p>
          </motion.div>

          {/* Aamiin */}
          <motion.p
            variants={itemVariants}
            className="font-playfair text-xl sm:text-2xl text-[#8b7355] leading-relaxed tracking-wide"
            style={{ fontStyle: "italic" }}
          >
            آمِيْنُ يَا رَبَّ الْعَالَمِيْنَ
          </motion.p>

          {/* Subtle gold shimmer bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4be9f] to-transparent opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Doa;
