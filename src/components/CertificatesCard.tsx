'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getResponsiveImageSizes } from '@/lib/ResponsiveUtils';
import { useState } from 'react';

const CertificatesCard = () => {
  const { theme } = useTheme();
  const [zoomedCertificate, setZoomedCertificate] = useState<{src: string, alt: string} | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const handleCertificateClick = (cert: {src: string, alt: string}) => {
    setZoomedCertificate(cert);
  };
  
  const certificates = [
    { src: '/assets/certificates/c1.png', alt: 'Googling Competition' },
    { src: '/assets/certificates/c2.jpg', alt: 'CCRC Scientic Circle Member' },
    { src: '/assets/certificates/c3.jpg', alt: 'Math Quiz Competition' },
    { src: '/assets/certificates/c4.jpg', alt: 'Online Global Quiz Competition' },
    { src: '/assets/certificates/c5.jpeg', alt: 'Bits & Bytes Quiz Competition' },
    { src: '/assets/certificates/c6.jpeg', alt: 'Sololearn "Introduction To C"' },
  ];

  return (
    <div className="relative">
      <motion.div 
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.src}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              y: -8, 
              rotateY: 3,
              rotateX: 2
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden border-[3px] border-[#003049] shadow-lg cursor-pointer relative group"
            style={{ background: theme === 'dark' ? '#1c2128' : '#f8f9fa' }}
            onClick={() => handleCertificateClick(cert)}
          >
            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-yellow-400/60 rounded-full z-10"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4
              }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-400/50 rounded-full z-10"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
            
            {/* Certificate image container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-300"
                  sizes={getResponsiveImageSizes('gallery')}
                />
              </motion.div>
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Certificate zoom indicator */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <motion.div
                  className="w-10 h-10 border-2 border-white/90 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-white text-sm font-bold">🔍</span>
                </motion.div>
              </motion.div>
              
              {/* Animated corner decorations */}
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-yellow-400/70 rounded-tl-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
              />
              <motion.div
                className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-yellow-400/70 rounded-tr-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
              />
            </div>
            
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-moranga truncate" style={{ color: theme === 'dark' ? '#c1121f' : '#780000' }}>
                {cert.alt}
              </h3>
            </div>
            
            {/* Animated border glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, ${theme === 'dark' ? '#c1121f' : '#780000'}40, transparent, ${theme === 'dark' ? '#c1121f' : '#780000'}40)`,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'subtract',
                padding: '3px'
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Certificate Zoom Modal */}
      <AnimatePresence>
        {zoomedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedCertificate(null)}
          >
            <motion.div
              className="relative max-w-6xl max-h-[95vh] w-full h-full p-4 cursor-pointer"
              initial={{ scale: 0.2, opacity: 0, rotateY: -20, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0, rotateX: 0 }}
              exit={{ scale: 0.2, opacity: 0, rotateY: 20, rotateX: 10 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 150,
                duration: 0.8 
              }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedCertificate(null);
              }}
            >
              <Image
                src={zoomedCertificate.src}
                alt={zoomedCertificate.alt}
                fill
                className="object-contain rounded-lg shadow-2xl cursor-pointer"
                sizes="100vw"
              />
              
              {/* Close button */}
              <motion.button
                onClick={() => setZoomedCertificate(null)}
                className="absolute -top-3 -right-3 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
              >
                <span className="text-xl font-bold">×</span>
              </motion.button>
              
              {/* Certificate title */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-sm font-medium">{zoomedCertificate.alt}</span>
              </motion.div>
              
              {/* Decorative corners for zoomed image */}
              <motion.div
                className="absolute top-6 left-6 w-8 h-8 border-l-4 border-t-4 border-yellow-400/80 rounded-tl-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              />
              <motion.div
                className="absolute top-6 right-6 w-8 h-8 border-r-4 border-t-4 border-yellow-400/80 rounded-tr-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-8 h-8 border-l-4 border-b-4 border-yellow-400/80 rounded-bl-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-6 right-6 w-8 h-8 border-r-4 border-b-4 border-yellow-400/80 rounded-br-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              />
              
              {/* Floating sparkles around zoomed certificate */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${15 + (i * 12)}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesCard;
