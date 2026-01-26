import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-champagne/[0.08] rounded-full blur-[100px]"></div>
      </div>

      {/* Loading Content */}
      <div className="relative flex flex-col items-center">
        {/* Animated Lines */}
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-px h-8 bg-gradient-to-b from-transparent via-champagne/60 to-transparent"
              initial={{ scaleY: 0.3, opacity: 0.3 }}
              animate={{ 
                scaleY: [0.3, 1, 0.3],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.p
          className="text-[10px] tracking-[0.4em] text-gray-500 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Sila Tunggu
        </motion.p>

        {/* Subtle dot indicator */}
        <motion.div 
          className="flex items-center gap-1.5 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-gray-400"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
