import { motion } from "framer-motion";

function Details() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const eventDetails = [
    {
      label: "Tarikh",
      value: "06 Jun 2026",
      sub: "Sabtu",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Masa",
      value: "11:00 Pagi",
      sub: "Jamuan: 12:00 Tengahari",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Lokasi",
      value: "Arena YAM Tengku Muda Pahang",
      sub: "Maran, Pahang",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
  ];

  const aturCara = [
    {
      time: "11:00 PG",
      event: "Ketibaan Tetamu",
      icon: (
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      time: "12:00 TH",
      event: "Ketibaan Pengantin",
      icon: (
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      time: "12:30 TH",
      event: "Jamuan Makan",
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h.01M15 12h.01"
          />
        </svg>
      ),
    },
    {
      time: "4:00 PTG",
      event: "Majlis Bersurai",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.5 2 6 4.5 6 7c0 2 1 3.5 2.5 4.5C7 12 6 13 6 14.5c0 2 1.5 3.5 3.5 3.5.5 0 1-.1 1.5-.3-.3.8-.5 1.5-.5 2.3 0 1.1.9 2 2 2s2-.9 2-2c0-.8-.2-1.5-.5-2.3.5.2 1 .3 1.5.3 2 0 3.5-1.5 3.5-3.5 0-1.5-1-2.5-2.5-3C18 10.5 19 9 19 7c0-2.5-2.5-5-7-5z" />
        </svg>
      ),
    },
  ];

  // Floral ornament SVG component
  const FloralOrnament = ({ className }) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
      <ellipse cx="40" cy="40" rx="6" ry="12" opacity="0.8" />
      <ellipse cx="40" cy="40" rx="12" ry="6" opacity="0.8" />
      <ellipse
        cx="40"
        cy="40"
        rx="6"
        ry="12"
        transform="rotate(45 40 40)"
        opacity="0.6"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="12"
        ry="6"
        transform="rotate(45 40 40)"
        opacity="0.6"
      />
      <circle cx="40" cy="40" r="4" fill="#1e40af" />
    </svg>
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 text-blue-200/30 rotate-12">
        <FloralOrnament className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 text-blue-200/20 -rotate-12">
        <FloralOrnament className="w-full h-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Header with floral decoration */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 relative"
        >
          <div className="inline-block relative">
            {/* Top decorative line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-400" />
              <FloralOrnament className="w-8 h-8 text-blue-500" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-400" />
            </div>

            <p
              className="text-sm font-medium tracking-[0.3em] text-blue-600 mb-3 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Butiran
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-gray-800 mb-4">
              Majlis Perkahwinan
            </h2>

            {/* Bottom decorative line */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-300 to-blue-400" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent via-blue-300 to-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Event Details Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {eventDetails.map((detail) => (
            <motion.div
              key={detail.label}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="bg-gradient-to-b from-white/95 to-blue-50/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-300/50 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-blue-300/50 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-blue-300/50 rounded-br-lg" />

                {/* Icon container */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {detail.icon}
                </div>

                <p
                  className="text-xs font-medium tracking-[0.25em] text-blue-600 mb-3 uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {detail.label}
                </p>
                <p className="font-playfair text-xl md:text-2xl text-gray-800 mb-2">
                  {detail.value}
                </p>
                <p className="font-dm text-xs text-gray-500">{detail.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-b from-white/95 to-blue-50/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-5 md:p-6 mb-8 shadow-lg overflow-hidden"
        >
          {/* Decorative header */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <svg
              className="w-5 h-5 text-blue-500"
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
            <p
              className="text-sm font-medium tracking-[0.2em] text-blue-600 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Lokasi Majlis
            </p>
            <svg
              className="w-5 h-5 text-blue-500"
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
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-blue-400" />
          </div>

          <div className="aspect-video w-full relative overflow-hidden rounded-xl border border-blue-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.02518538348!2d102.77737227497309!3d3.5816890963924717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31ced5dd2d672d2b%3A0xa6522cd1b74a812a!2sArena%20YAM%20Tengku%20Muda%20Pahang!5e0!3m2!1sen!2smy!4v1773073319617!5m2!1sen!2smy"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(0.1) contrast(1.05) brightness(1.0)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Majlis"
              className="absolute inset-0"
            />
          </div>
        </motion.div>

        {/* Google Maps Button */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.a
            href="https://maps.app.goo.gl/gaRP3RRCACf5GbSa8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-dm text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* Atur Cara Section */}
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-b from-white/95 to-blue-50/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 md:p-10 shadow-lg overflow-hidden"
        >
          {/* Corner floral decorations */}
          <FloralOrnament className="absolute -top-4 -left-4 w-16 h-16 text-blue-200/40" />
          <FloralOrnament className="absolute -bottom-4 -right-4 w-16 h-16 text-blue-200/40" />

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <p
              className="text-sm font-medium tracking-[0.25em] text-blue-600 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Atur Cara Majlis
            </p>
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400" />
          </div>

          <div className="max-w-md mx-auto">
            {aturCara.map((item, index) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4 py-4 group">
                  {/* Timeline dot */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    {index < aturCara.length - 1 && (
                      <div className="absolute top-full w-0.5 h-8 bg-gradient-to-b from-blue-300 to-blue-100" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex justify-between items-center bg-white/60 rounded-xl px-4 py-3 border border-blue-100/50 group-hover:bg-white/80 transition-colors duration-300">
                    <span className="font-dm text-gray-700 text-sm">
                      {item.event}
                    </span>
                    <span className="font-playfair text-blue-700 text-sm font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Details;
